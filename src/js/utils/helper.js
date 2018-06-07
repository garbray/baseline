const promise = require('es6-promise').Promise;

if (typeof Promise === 'undefined') {
  window.Promise = promise;
}

// Get element(s) by CSS selector:
export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

export function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

// addEventListener wrapper:
export function $on(target, type, callback) {
  target.addEventListener(type, callback);
}

export function $off(target, type, callback) {
  target.removeEventListener(type, callback);
}

export function hasClass(target, className) {
  return target.classList.contains(className);
}

export function addClass(target, className) {
  target.classList.add(className);
}

export function removeClass(target, className) {
  target.classList.remove(className);
}

export function toggleClass(target, className) {
  target.classList.toggle(className);
}

export function log(...text) {
  console.log(...text); //eslint-disable-line
}

/**
 * detect the device based on screen size
 * @return {String} return the device based on the screen size
 */
export function deviceDetection() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 768) {
    return 'mobile';
  } else if (viewportWidth < 1024) {
    return 'tablet';
  }
  return 'desktop';
}
