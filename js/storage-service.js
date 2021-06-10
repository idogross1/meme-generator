'use strict';

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const val = localStorage.getItem(key);
  return JSON.parse(val);
}
