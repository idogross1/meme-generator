'use strict';

var gKeyWords = { happy: 12, funny: 1 };
var gImages = [
  { id: 1, url: 'images/1.jpg', keywords: ['happy'] },
  { id: 2, url: 'images/2.jpg', keywords: ['happy'] },
  { id: 3, url: 'images/3.jpg', keywords: ['happy'] },
  { id: 4, url: 'images/4.jpg', keywords: ['happy'] },
  { id: 5, url: 'images/5.jpg', keywords: ['happy'] },
  { id: 6, url: 'images/6.jpg', keywords: ['happy'] },
  { id: 7, url: 'images/7.jpg', keywords: ['happy'] },
  { id: 8, url: 'images/8.jpg', keywords: ['happy'] },
  { id: 9, url: 'images/9.jpg', keywords: ['happy'] },
  { id: 10, url: 'images/10.jpg', keywords: ['happy'] },
  { id: 11, url: 'images/11.jpg', keywords: ['happy'] },
  { id: 12, url: 'images/12.jpg', keywords: ['happy'] },
  { id: 13, url: 'images/13.jpg', keywords: ['happy'] },
  { id: 14, url: 'images/14.jpg', keywords: ['happy'] },
  { id: 15, url: 'images/15.jpg', keywords: ['happy'] },
  { id: 16, url: 'images/16.jpg', keywords: ['happy'] },
  { id: 17, url: 'images/17.jpg', keywords: ['happy'] },
  { id: 18, url: 'images/18.jpg', keywords: ['happy'] },
];
const KEY = 'meme';

var gMeme = {};
var gActiveLine = 0;
var gId = 0;
var gSavedMemes = [];

function createMeme(imgId) {
  gMeme.selectedImgId = imgId;
  gMeme.selectedLineIdx = 0;
  gMeme.lines = [];
}

function updateLine(txt) {
  console.log();
  if (!gMeme.lines.length) createNewLine(txt);
  gMeme.lines[gActiveLine].txt = txt;
  //   gMeme.lines[gActiveLine].x = getCoordX(txt);
}

function updateFontSize(diff) {
  if (!gMeme.lines[gActiveLine].size && diff < 0) return;
  gMeme.lines[gActiveLine].size += diff;
  console.log(gMeme.lines[gActiveLine].size);
}

function updateLinePosition(diff) {
  // check that line doesn't go out of canvas
  gMeme.lines[gActiveLine].y += 5 * diff;
}

function createNewLine(txt = '') {
  gMeme.lines.push({
    txt,
    size: 40,
    align: 'center',
    color: 'white',
    font: 'Impact',
    x: gCanvas.width / 2,
    y: getY(),
  });
}
function getY() {
  if (!gMeme.lines.length) {
    return 30;
  }
  if (gMeme.lines.length === 1) {
    return gCanvas.height - 25;
  }
  return gCanvas.height / 2;
}

function changeActiveLine() {
  //   if (gActiveLine === gMeme.lines.length - 1) return (gActiveLine = 0);
  //   return gActiveLine++;
  gActiveLine++;
  gActiveLine = gActiveLine % gMeme.lines.length;
}

function saveMeme() {
  const image = {
    id: gId++,
    url: gCanvas.toDataURL(),
  };
  gSavedMemes.push(image);
  saveToLocalStorage(KEY, gSavedMemes);
}

function getMemes() {
  gSavedMemes = loadFromStorage(KEY);
}

function downloadMeme(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'meme';
}
