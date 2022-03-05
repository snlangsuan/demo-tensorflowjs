import * as tf from '@tensorflow/tfjs'
import * as blazeface from '@tensorflow-models/blazeface'
export default (context, inject) => {
  inject('tf', tf)
  inject('blazeface', blazeface)
}
