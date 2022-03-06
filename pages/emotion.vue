<template>
  <div v-resize="onResize" class="emotion-container" style="width: 100%">
    <div class="cam-box">
      <video
        v-show="false"
        id="webcam"
        autoplay
        muted
        width="100%"
        height="100%"
      ></video>
      <canvas id="webcam_canvas" :width="canvasWidth" :height="canvasHeight"
        >Canvas not supported</canvas
      >
      <div class="emotion-face-list">
        <template v-for="(face, i) in faces">
          <div :key="'face-' + i" class="emotion-face-item">
            <v-img :src="face" class="grey" max-height="100" max-width="100" />
          </div>
        </template>
      </div>
    </div>
    <v-overlay :value="loading">
      <div class="text-center">
        <v-progress-circular indeterminate size="48" />
        <div class="white-text pt-2">Loading...</div>
      </div>
    </v-overlay>
    <v-overlay :value="unsupported">
      <div class="text-center">
        <v-icon size="64">mdi-camera-off-outline</v-icon>
        <div class="text-h6 py-3">We can`t find your camera</div>
        <v-btn color="primary" @click="retryCamera">retry</v-btn>
      </div>
    </v-overlay>
    <v-dialog v-model="errorDialog" max-width="480" persistent>
      <v-card>
        <v-card-text class="py-3">
          {{ errorMessage }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import numeral from 'numeral'
export default {
  name: 'HomePage',
  data() {
    return {
      loading: false,
      unsupported: false,
      faceModel: null,
      emotionModel: null,
      control: false,
      video: null,
      videoCanvas: null,
      videoContext: null,
      videoWidth: 1280,
      videoHeight: 720,
      canvasWidth: 100,
      canvasHeight: 100,
      mWidth: 100,
      mHeight: 100,
      mX: 0,
      mY: 0,
      errorDialog: false,
      errorMessage: '',
      faces: [],
      countDelay: 3000,
      delayDetection: 2000,
      emotions: [
        'angry',
        'disgust',
        'fear',
        'happy',
        'neutral',
        'sad',
        'surprise',
      ],
    }
  },
  mounted() {
    this.initModel()
  },
  methods: {
    onResize() {
      this.canvasWidth = window.innerWidth
      this.canvasHeight = window.innerHeight
      const ratio = this.videoHeight / this.videoWidth
      this.mWidth = this.canvasWidth
      this.mHeight = this.canvasWidth * ratio
      this.mY = this.canvasHeight / 2 - this.mHeight / 2
      console.log('resize', ratio, this.canvasWidth, this.canvasHeight)
    },
    async initModel() {
      this.unsupported = !this.getUserMediaSupported()
      if (!this.unsupported) {
        try {
          this.loading = true
          this.faceModel = await this.$blazeface.load()
          this.emotionModel = await this.$tf.loadLayersModel(
            'https://snlangsuan.github.io/demo-tensorflowjs/models/emotion/model.json'
          )
          this.startCam()
        } catch (error) {
          console.error(error)
          this.errorMessage = 'Can`t not be load detection model.'
          this.errorDialog = true
        } finally {
          this.loading = false
        }
      }
    },
    async startCam() {
      try {
        if (!this.video) this.video = document.querySelector('#webcam')
        if (!this.videoCanvas)
          this.videoCanvas = document.querySelector('#webcam_canvas')
        if (this.videoCanvas)
          this.videoContext = this.videoCanvas.getContext('2d')
        this.videoContext.font = '16px Kanit'
        this.control = true
        const constraints = {
          audio: false,
          video: { width: this.videoWidth, height: this.videoHeight },
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        this.video.srcObject = stream
        this.video.addEventListener('loadeddata', this.predictWebcam)
        this.video.play()
        this.unsupported = false
      } catch (error) {
        console.error(error)
        // this.errorMessage = 'Can`t not be load detection model.'
        // this.errorDialog = true
        this.unsupported = true
      }
    },
    async retryCamera() {
      // await navigator.permissions.revoke({})
      const permissionStatus = await navigator.permissions.query({
        name: 'camera',
      })
      console.log(permissionStatus)
      permissionStatus.onchange = (e) => {
        const newState = e.target.state
        if (e.type === 'change' && newState === 'granted') {
          this.startCam()
        }
      }
      this.startCam()
      // permissionStatus.onchange(() => console.log('camera permission state has changed to ', this.state))
    },
    async predictWebcam() {
      try {
        this.videoContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.videoContext.drawImage(
          this.video,
          this.mX,
          this.mY,
          this.mWidth,
          this.mHeight
        )
        this.countDelay += 100
        // this.videoContext.fillRect(20, 20, 200, 200)
        if (this.faceModel && this.emotionModel) {
          const frame = this.videoContext.getImageData(
            this.mX,
            this.mY,
            this.mWidth,
            this.mHeight
          )
          // this.faces.push(this.toDataURL(frame))
          const predictions = await this.faceModel.estimateFaces(frame)
          // console.log(predictions)
          // if (this.countDelay >= this.delayDetection) this.faces = []
          for (const item of predictions) {
            const probability = item.probability[0]
            if (probability <= 0.6) continue
            // console.log(item)
            const start = item.topLeft
            const end = item.bottomRight
            const size = [end[0] - start[0], end[1] - start[1]]
            // this.videoContext.fillRect(start[0], start[1],size[0], size[1])
            // this.videoContext.beginPath()
            // this.videoContext.strokeStyle= 'red'
            // this.videoContext.lineWidth = 4
            // this.videoContext.rect(start[0], start[1],size[0], size[1])
            // this.videoContext.stroke()

            // if (this.countDelay >= this.delayDetection) {
            const landmark = item.landmarks
            // const nosex = landmark[2][0]
            // const nosey = landmark[2][1]
            // const right = landmark[4][0]
            // const left = landmark[5][0]
            // const length = (left - right) / 2 + 5
            // const frame2 = this.videoContext.getImageData(nosex - length, nosey - length, 2 * length, 2 * length)
            const frame2 = this.videoContext.getImageData(
              start[0],
              start[1] + this.mY,
              size[0],
              size[1]
            )
            let imageTensor = this.$tf.browser
              .fromPixels(frame2, 3)
              .resizeBilinear([96, 96])
              .mean(2)
              .toFloat()
              .expandDims(-1)
            imageTensor = this.$tf.image
              .grayscaleToRGB(imageTensor)
              .expandDims(0)
            const result = this.emotionModel.predict(imageTensor)
            const predictedValue = result.arraySync()
            const maxIdx = this.argMax(predictedValue[0])
            if (maxIdx >= 0 && predictedValue[0][maxIdx] > 0.6) {
              const label = this.emotions[maxIdx]
              const emotionProb = predictedValue[0][maxIdx]
              const color = maxIdx === 0 ? 'red' : 'green'

              this.videoContext.beginPath()
              this.videoContext.strokeStyle = color
              this.videoContext.lineWidth = 4
              this.videoContext.rect(
                start[0],
                start[1] + this.mY,
                size[0],
                size[1]
              )
              this.videoContext.stroke()

              landmark.forEach((x) => {
                this.videoContext.fillRect(x[0], x[1] + this.mY, 5, 5)
              })

              this.videoContext.fillStyle = color
              this.videoContext.fillRect(
                start[0],
                start[1] + this.mY,
                size[0],
                30
              )
              this.videoContext.fillStyle = 'white'
              this.videoContext.fillText(
                label + ' (' + numeral(emotionProb).format('0.00%') + ')',
                start[0] + 10,
                start[1] + this.mY + 20
              )
            }
            // }
          }
          // if (this.countDelay >= this.delayDetection) this.countDelay = 0
        }
        // if (this.control) window.requestAnimationFrame(this.predictWebcam)
        if (this.control) setTimeout(this.predictWebcam, 300)
      } catch (error) {
        console.error(error)
      }
    },
    getUserMediaSupported() {
      return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    },
    toDataURL(image) {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.putImageData(image, 0, 0)
      return canvas.toDataURL('image/jpg')
    },
    argMax(arr) {
      const max = Math.max(...arr)
      const index = arr.indexOf(max)
      return index
    },
  },
}
</script>

<style lang="scss" scoped>
.emotion {
  &-container {
    height: 100%;
    background-color: #000;
  }

  &-face {
    &-list {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      min-height: 116px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 8px;
      display: flex;
    }
  }
}
.cam-box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
