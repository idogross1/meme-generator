'use strict';

var gElCanvas;
var gCtx;

function init() {
  gElCanvas = document.getElementById('canvas');
  gCtx = canvas.getContext('2d');
  renderImage();
}

function renderImage(imageId = 15) {
  var img = new Image();
  img.src = `../images/${imageId}.jpg`;
  //   console.log(img);
  console.log(gCtx);
  console.log(gElCanvas);
  img.onload = () => {
    var w = canvas.width;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var h = (w * nh) / nw;
    console.log(h);
    gCtx.drawImage(img, 0, 0, w, h);
  };
}
