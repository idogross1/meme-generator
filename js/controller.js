'use strict';

var gCanvas;
var gCtx;

function init() {
  gCanvas = document.getElementById('canvas');
  gCtx = gCanvas.getContext('2d');
}

function onImage(imgId) {
  document.querySelector('.images-gallery').classList.add('hide');
  document.querySelector('.main-content').classList.remove('hide');
  createMeme(imgId);
  renderMeme();
}

function renderMeme() {
  var img = new Image();
  img.src = `images/${gMeme.selectedImgId}.jpg`;
  img.onload = () => {
    renderImage(img);
    if (!gMeme.lines.length) return;
    renderText(gMeme.lines[0].txt);
  };
}

function renderImage(img) {
  var w = gCanvas.width;
  var nw = img.naturalWidth;
  var nh = img.naturalHeight;
  var h = (w * nh) / nw;
  gCtx.drawImage(img, 0, 0, w, h);
}

function renderText() {
  gCtx.lineWidth = 2;
  gCtx.font = `${gMeme.lines[gActiveLine].size}px ${gMeme.lines[gActiveLine].font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'middle';
  gCtx.fillText(
    gMeme.lines[gActiveLine].txt,
    gMeme.lines[gActiveLine].x,
    gMeme.lines[gActiveLine].y
  );
}

function onTypingLine(txt) {
  updateLine(txt);
  renderMeme();
}

function onChangeSize(diff) {
  updateFontSize(diff);
  renderMeme();
}

function deleteText() {
  console.log('test');
  gCtx.clearRect(0, 0, 100, 100);
}
