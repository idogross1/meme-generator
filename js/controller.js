'use strict';

var gCanvas;
var gCtx;

function init() {
  gCanvas = document.getElementById('canvas');
  gCtx = gCanvas.getContext('2d');
  onImage(3);
}

function onImage(imgId = 3) {
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
    gMeme.lines.forEach((line, i) => renderText(line, i));
    // renderText(gMeme.lines[0].txt); //TODO: render all lines forEach()
  };
}

function renderImage(img) {
  var w = gCanvas.width;
  var nw = img.naturalWidth;
  var nh = img.naturalHeight;
  var h = (w * nh) / nw;
  gCtx.drawImage(img, 0, 0, w, h);
}

function renderText(line, idx) {
  console.log('line', line);
  console.log('idx', idx);
  if (idx === gActiveLine) {
    gCtx.strokeStyle = 'red';
    gCtx.strokeRect(10, gMeme.lines[gActiveLine].y - 30, 380, 75);
  }
  gCtx.lineWidth = 2;
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'middle';
  gCtx.fillText(line.txt, line.x, line.y);
}

function onTypingLine(txt) {
  updateLine(txt);
  renderMeme();
}

function onChangeSize(diff) {
  updateFontSize(diff);
  renderMeme();
}

function onMoveLine(diff) {
  updateLinePosition(diff);
  renderMeme();
}

function onCanvas(ev) {
  console.log(ev);
}
function deleteText() {
  console.log('test');
  gCtx.clearRect(0, 0, 100, 100);
}
