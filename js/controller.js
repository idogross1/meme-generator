'use strict';

var gElCanvas;
var gCtx;

function init() {
  gElCanvas = document.getElementById('canvas');
  gCtx = canvas.getContext('2d');
  //   renderText(gMeme.lines[0].txt);
  renderMeme(gMeme.selectedImgId);
}

function renderMeme(memeId) {
  var img = new Image();
  img.src = `../images/${memeId}.jpg`;
  img.onload = () => {
    renderImage(img);
    renderText(gMeme.lines[0].txt);
  };
}

function renderImage(img) {
  var w = canvas.width;
  var nw = img.naturalWidth;
  var nh = img.naturalHeight;
  var h = (w * nh) / nw;
  gCtx.drawImage(img, 0, 0, w, h);
}

function renderText(txt) {
  gCtx.lineWidth = 2;
  gCtx.font = '40px Impact';
  gCtx.textBaseline = 'middle';
  gCtx.fillText(txt, 20, 100);
}
