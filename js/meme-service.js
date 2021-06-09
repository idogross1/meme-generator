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
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    { txt: 'I never eat falafel', size: 20, align: 'left', color: 'black' },
  ],
};
var gActiveLine = 0;

function createMeme(imgId) {
  gMeme.selectedImgId = imgId;
  gMeme.selectedLineIdx = 0;
  gMeme.lines = [];
}

function updateLine(txt) {
  if (!gMeme.lines.length) createNewLine(txt);
  gMeme.lines[gActiveLine].txt = txt;
  //   gMeme.lines[gActiveLine].x = getCoordX(txt);
}

function updateFontSize(diff) {
  if (!gMeme.lines[gActiveLine].size && diff < 0) return;
  gMeme.lines[gActiveLine].size += diff;
  console.log(gMeme.lines[gActiveLine].size);
}

function createNewLine(txt) {
  gMeme.lines.push({
    txt,
    size: 40,
    align: 'center',
    color: 'white',
    font: 'Impact',
    x: 200,
    y: 40,
  });
}

function getCoordX(txt) {
  var textWidth = gCtx.measureText(txt).width;
  return (gCanvas.width - textWidth) / 2;
}
