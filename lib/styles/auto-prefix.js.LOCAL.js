'use strict';

var isBrowser = typeof window !== 'undefined';
var prefixed = undefined;
if (isBrowser) {
  var Modernizr = require('../utils/modernizr.custom');
  var memoize = require('memoizee');
  prefixed = memoize(Modernizr.prefixed.bind(Modernizr), { length: 1, resolvers: [String], max: 256 });
}

module.exports = {

  all: function all(styles) {
    var prefixedStyle = {};
    for (var key in styles) {
      prefixedStyle[this.single(key)] = styles[key];
    }
    return prefixedStyle;
  },

  set: function set(style, key, value) {
    style[this.single(key)] = value;
  },

  single: function single(key) {
    return isBrowser ? prefixed(key) : key;
  },

  singleHyphened: function singleHyphened(key) {
    var str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }

};