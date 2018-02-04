"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FIREBASE = void 0;

var firebase = function firebase(_firebase) {
  if (_firebase) {
    FIREBASE = _firebase;
  }
  return FIREBASE;
};

exports.default = firebase;