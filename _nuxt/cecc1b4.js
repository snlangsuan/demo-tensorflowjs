(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{569:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=569},570:function(e,t,n){var content=n(589);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(209).default)("061d59ac",content,!0,{sourceMap:!1})},588:function(e,t,n){"use strict";n(570)},589:function(e,t,n){var r=n(208)(!1);r.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@100;300;400;500;600;700&display=swap);"]),r.push([e.i,".emotion-container[data-v-0c225a1f]{height:100%;background-color:#000}.emotion-face-list[data-v-0c225a1f]{position:absolute;bottom:0;left:0;right:0;min-height:116px;background-color:rgba(0,0,0,.5);padding:8px;display:flex}.cam-box[data-v-0c225a1f]{width:100%;height:100%;position:relative}",""]),e.exports=r},625:function(e,t,n){"use strict";n.r(t);n(122),n(34),n(82),n(129),n(110),n(67),n(71),n(130),n(153),n(111);var r=n(567),o=n(51),c=(n(168),n(155),n(324)),d=n.n(c),l=n(587);function v(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,d=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){d=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(d)throw o}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var m={name:"HomePage",data:function(){return{loading:!1,unsupported:!1,faceModel:null,emotionModel:null,control:!1,video:null,videoCanvas:null,videoContext:null,videoWidth:1280,videoHeight:720,canvasWidth:100,canvasHeight:100,mWidth:100,mHeight:100,mX:0,mY:0,errorDialog:!1,errorMessage:"",faces:[],countDelay:3e3,delayDetection:2e3,emotions:["angry","disgust","fear","happy","neutral","sad","surprise"]}},mounted:function(){this.initModel()},methods:{onResize:function(){this.canvasWidth=window.innerWidth,this.canvasHeight=window.innerHeight;var e=this.videoHeight/this.videoWidth;this.mWidth=this.canvasWidth,this.mHeight=this.canvasWidth*e,this.mY=this.canvasHeight/2-this.mHeight/2,console.log("resize",e,this.canvasWidth,this.canvasHeight)},initModel:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.unsupported=!e.getUserMediaSupported(),e.unsupported){t.next=21;break}return t.prev=2,e.loading=!0,t.next=6,l.c("/demo-tensorflowjs/models/face-mobilenet-v1");case 6:return e.faceModel=!0,t.next=9,e.$tf.loadLayersModel("/demo-tensorflowjs/models/emotion/model.json");case 9:e.emotionModel=t.sent,e.startCam(),t.next=18;break;case 13:t.prev=13,t.t0=t.catch(2),console.error(t.t0),e.errorMessage="Can`t not be load detection model.",e.errorDialog=!0;case 18:return t.prev=18,e.loading=!1,t.finish(18);case 21:case"end":return t.stop()}}),t,null,[[2,13,18,21]])})))()},startCam:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.video||(e.video=document.querySelector("#webcam")),e.videoCanvas||(e.videoCanvas=document.querySelector("#webcam_canvas")),e.videoCanvas&&(e.videoContext=e.videoCanvas.getContext("2d")),e.videoContext.font="16px Kanit",e.control=!0,n={audio:!1,video:{width:e.videoWidth,height:e.videoHeight}},t.next=9,navigator.mediaDevices.getUserMedia(n);case 9:r=t.sent,e.video.srcObject=r,e.video.addEventListener("loadeddata",e.predictWebcam),e.video.play(),e.unsupported=!1,t.next=20;break;case 16:t.prev=16,t.t0=t.catch(0),console.error(t.t0),e.unsupported=!0;case 20:case"end":return t.stop()}}),t,null,[[0,16]])})))()},retryCamera:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.permissions.query({name:"camera"});case 2:n=t.sent,console.log(n),n.onchange=function(t){var n=t.target.state;"change"===t.type&&"granted"===n&&e.startCam()},e.startCam();case 6:case"end":return t.stop()}}),t)})))()},predictWebcam:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,r,o,c,h,m,f,x,y,w,C,label,k,M;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e.videoContext.clearRect(0,0,e.canvasWidth,e.canvasHeight),e.videoContext.drawImage(e.video,e.mX,e.mY,e.mWidth,e.mHeight),e.countDelay+=100,!e.faceModel||!e.emotionModel){t.next=40;break}return t.next=7,l.b(e.videoCanvas,new l.a);case 7:n=t.sent,r=l.d(n,{width:e.mWidth,height:e.mHeight}),o=v(r),t.prev=10,o.s();case 12:if((c=o.n()).done){t.next=32;break}if(h=c.value,!(h.score<=.6)){t.next=17;break}return t.abrupt("continue",30);case 17:m=h.box.topLeft,e.videoContext.beginPath(),e.videoContext.strokeStyle="#fefefe",e.videoContext.lineWidth=4,e.videoContext.rect(m.x,m.y+e.mY,h.box.width,h.box.height),e.videoContext.stroke(),f=e.videoContext.getImageData(m.x,m.y+e.mY,h.box.width,h.box.height),x=e.$tf.browser.fromPixels(f,3).resizeBilinear([96,96]).mean(2).toFloat().expandDims(-1),x=e.$tf.image.grayscaleToRGB(x).expandDims(0),y=e.emotionModel.predict(x),w=y.arraySync(),(C=e.argMax(w[0]))>=0&&w[0][C]>.6&&(label=e.emotions[C],k=w[0][C],M=0===C?"red":"green",e.videoContext.beginPath(),e.videoContext.strokeStyle=M,e.videoContext.lineWidth=4,e.videoContext.rect(m.x,m.y+e.mY,h.box.width,h.box.height),e.videoContext.stroke(),e.videoContext.fillStyle=M,e.videoContext.fillRect(m.x,m.y+e.mY,h.box.width,30),e.videoContext.fillStyle="white",e.videoContext.fillText(label+" ("+d()(k).format("0.00%")+")",m.x+10,m.y+e.mY+20));case 30:t.next=12;break;case 32:t.next=37;break;case 34:t.prev=34,t.t0=t.catch(10),o.e(t.t0);case 37:return t.prev=37,o.f(),t.finish(37);case 40:e.control&&setTimeout(e.predictWebcam,300),t.next=46;break;case 43:t.prev=43,t.t1=t.catch(0),console.error(t.t1);case 46:case"end":return t.stop()}}),t,null,[[0,43],[10,34,37,40]])})))()},getUserMediaSupported:function(){return navigator.mediaDevices&&navigator.mediaDevices.getUserMedia},toDataURL:function(image){var canvas=document.createElement("canvas");return canvas.width=image.width,canvas.height=image.height,canvas.getContext("2d").putImageData(image,0,0),canvas.toDataURL("image/jpg")},argMax:function(e){var t=Math.max.apply(Math,Object(r.a)(e));return e.indexOf(t)}}},f=(n(588),n(182)),x=n(253),y=n.n(x),w=n(626),C=n(584),k=n(581),M=n(624),_=n(623),W=n(627),D=n(583),R=n(579),H=n(616),S=n.n(H),j=n(617),component=Object(f.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"resize",rawName:"v-resize",value:e.onResize,expression:"onResize"}],staticClass:"emotion-container",staticStyle:{width:"100%"}},[n("div",{staticClass:"cam-box"},[n("video",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{id:"webcam",autoplay:"",muted:"",width:"100%",height:"100%"},domProps:{muted:!0}}),e._v(" "),n("canvas",{attrs:{id:"webcam_canvas",width:e.canvasWidth,height:e.canvasHeight}},[e._v("Canvas not supported")]),e._v(" "),n("div",{staticClass:"emotion-face-list"},[e._l(e.faces,(function(e,i){return[n("div",{key:"face-"+i,staticClass:"emotion-face-item"},[n("v-img",{staticClass:"grey",attrs:{src:e,"max-height":"100","max-width":"100"}})],1)]}))],2)]),e._v(" "),n("v-overlay",{attrs:{value:e.loading}},[n("div",{staticClass:"text-center"},[n("v-progress-circular",{attrs:{indeterminate:"",size:"48"}}),e._v(" "),n("div",{staticClass:"white-text pt-2"},[e._v("Loading...")])],1)]),e._v(" "),n("v-overlay",{attrs:{value:e.unsupported}},[n("div",{staticClass:"text-center"},[n("v-icon",{attrs:{size:"64"}},[e._v("mdi-camera-off-outline")]),e._v(" "),n("div",{staticClass:"text-h6 py-3"},[e._v("We can`t find your camera")]),e._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:e.retryCamera}},[e._v("retry")])],1)]),e._v(" "),n("v-dialog",{attrs:{"max-width":"480",persistent:""},model:{value:e.errorDialog,callback:function(t){e.errorDialog=t},expression:"errorDialog"}},[n("v-card",[n("v-card-text",{staticClass:"py-3"},[e._v("\n        "+e._s(e.errorMessage)+"\n      ")])],1)],1)],1)}),[],!1,null,"0c225a1f",null);t.default=component.exports;y()(component,{VBtn:w.a,VCard:C.a,VCardText:k.a,VDialog:M.a,VIcon:_.a,VImg:W.a,VOverlay:D.a,VProgressCircular:R.a}),S()(component,{Resize:j.a})}}]);