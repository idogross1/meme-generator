'use strict';

var gCanvas;
var gCtx;

function init() {
  gCanvas = document.getElementById('canvas');
  gCtx = gCanvas.getContext('2d');
  //   onImage(3);
  getMemes();
  renderMemesGallery();
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
  };
}

function renderImage(img) {
  var w = gCanvas.width;
  var nw = img.naturalWidth;
  var nh = img.naturalHeight;
  var h = (w * nh) / nw;
  resizeCanvas(w, h);
  gCtx.drawImage(img, 0, 0, w, h);
}

function resizeCanvas(w, h) {
  gCanvas.width = w;
  gCanvas.height = h;
}

function renderText(line, idx) {
  if (idx === gActiveLine) {
    gCtx.strokeStyle = 'red';
    gCtx.strokeText(line.txt, line.x, line.y);
  } else {
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(line.txt, line.x, line.y);
  }

  gCtx.lineWidth = 2;
  gCtx.fillStyle = 'white';
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
  var pos = { x: ev.offsetX, y: ev.offsetY };
  console.log('position');
  console.log(pos);
  gMeme.lines.forEach((line) => {
    console.log('x', line.x);
    console.log('y', line.y);
    // if(pos.x > 10 && pos.x<line.x&& pos.y< )
  });
}

function onAddNewLine() {
  document.querySelector('.line-input').value = '';
  gActiveLine++;
  createNewLine();
  console.log(gMeme);
  renderMeme();
}

function onChangeLine() {
  changeActiveLine();
  renderMeme();
}

function onSave() {
  saveMeme();
}

function onDownload(elLink) {
  downloadMeme(elLink);
}

function onMemes() {
  // TODO: put memes gallery out of hide
  document.querySelector('.memes-gallery').classList.remove('hide');
  document.querySelector('.images-gallery').classList.add('hide');
  renderMemesGallery();
}

function onGallery() {
  document.querySelector('.images-gallery').classList.remove('hide');
  document.querySelector('.memes-gallery').classList.add('hide');
  document.querySelector('.main-content').classList.add('hide');
}

function renderMemesGallery() {
  //   <img src="images/1.jpg" alt="image 1" onclick="onImage(1)" />
  const markup = gSavedMemes.map((meme) => `<img src=${meme.url} />`).join('');
  //   console.log(markup);
  var elMemesGal = document.getElementById('memes-gallery');
  elMemesGal.innerHTML = markup;
}
