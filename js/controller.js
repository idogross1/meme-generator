'use strict';

var gCanvas;
var gCtx;
var gMouseIsDown = false;

function init() {
  gCanvas = document.getElementById('canvas');
  gCtx = gCanvas.getContext('2d');
  //   onImage(3);
  renderAllImagesGallery();
  getMemes();
  renderMemesGallery();
}

function renderAllImagesGallery() {
  var images = getImages();
  renderImagesGallery(images);
}

function renderImagesGallery(images) {
  const markup = images
    .map(
      (image) =>
        `<img src="${image.url}" alt="image ${image.id}" onclick="onImage(${image.id})" />`
    )
    .join('');
  document.querySelector('.images-gallery').innerHTML = markup;
  //   console.dir(document.querySelector('.images-gallery'));
}

function onImage(imgId) {
  document.querySelector('.images-gallery').classList.add('hide');
  document.querySelector('.search-box').classList.add('hide');
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
  gCtx.lineWidth = 2;
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'middle';
  if (idx === gActiveLine) {
    gCtx.strokeStyle = 'red';
    gCtx.strokeText(line.txt, line.x, line.y);
  } else {
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(line.txt, line.x, line.y);
  }

  gCtx.fillStyle = 'white';
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
  var lineIndex = gMeme.lines.findIndex(
    (line) => pos.y > line.y - line.size / 2 && line.y + line.size / 2 > pos.y
  );
  updateActiveLine(lineIndex);
  renderMeme();
}

function onCanvasDrag(ev) {
  var pos = { x: ev.offsetX, y: ev.offsetY };
  console.log(gCanvas);
  var temp = document.querySelector('.canvas-container');
  console.log(temp);
  // .addEventListner('onmousemove', () => console.log('test'));
}

function onAddNewLine() {
  if (!isLines()) return;
  document.querySelector('.line-input').value = '';
  gActiveLine++;
  createNewLine();
  renderMeme();
}

function onChangeLine() {
  changeActiveLine();
  renderMeme();
}

function onSave() {
  changeFocus();
  renderMeme();
  saveMeme();
}

function onDownload(elLink) {
  downloadMeme(elLink);
}

function onDelete() {
  //   deleteLine();
}

function onMemes() {
  // TODO: put memes gallery out of hide
  document.querySelector('.memes-gallery').classList.remove('hide');
  document.querySelector('.images-gallery').classList.add('hide');
  document.querySelector('.main-content').classList.add('hide');
  document.querySelector('.search-box').classList.add('hide');
  renderMemesGallery();
}

function onGallery() {
  document.querySelector('.images-gallery').classList.remove('hide');
  document.querySelector('.search-box').classList.remove('hide');
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

function handleMouseDown(event) {
  const position = {
    x: event.offsetX,
    y: event.offsetY,
  };

  if (!checkIfLineWasSelected(position)) return;
  document.getElementById('canvas').addEventListener('mousemove', dragText);
}

function checkIfLineWasSelected(pos) {
  var lineIndex = gMeme.lines.findIndex(
    (line) => pos.y > line.y - line.size / 2 && line.y + line.size / 2 > pos.y
  );
  if (lineIndex > -1) return true;
  return false;
}

function dragText(event) {
  const position = {
    x: event.offsetX,
    y: event.offsetY,
  };
  updateLinePosition(position);
  renderMeme();
}

function handleMouseUp() {
  document.getElementById('canvas').removeEventListener('mousemove', dragText);
}

function onSearch() {
  var searchWord = document.querySelector('.search-input').value;
  if (!searchWord) return;
  var images = getImagesSearch(searchWord);
  renderImagesGallery(images);
  document.querySelector('.search-input').value = '';
}
