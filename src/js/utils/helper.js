const promise = require('es6-promise').Promise;

if (typeof Promise === 'undefined') {
  window.Promise = promise;
}

/ Get element(s) by CSS selector:
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

// addEventListener wrapper:
function $on(target, type, callback) {
  target.addEventListener(type, callback);
}

function $off(target, type, callback) {
  target.removeEventListener(type, callback);
}

function hasClass(target, className) {
  return target.classList.contains(className);
}

function addClass(target, className) {
  target.classList.add(className);
}

function removeClass(target, className) {
  target.classList.remove(className);
}

function toggleClass(target, className) {
  target.classList.toggle(className);
}

function log(...text) {
  console.log(...text); //eslint-disable-line
}
