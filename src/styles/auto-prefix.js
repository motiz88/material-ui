const isBrowser = typeof window !== 'undefined';
let prefixed;
if (isBrowser) {
  const Modernizr = require('../utils/modernizr.custom');
  const memoize = require('memoizee');
  prefixed = memoize(Modernizr.prefixed.bind(Modernizr), {length: 1, resolvers: [String], max: 256});
}

module.exports = {

  all(styles) {
    let prefixedStyle = {};
    for (let key in styles) {
      prefixedStyle[this.single(key)] = styles[key];
    }
    return prefixedStyle;
  },

  set(style, key, value) {
    style[this.single(key)] = value;
  },

  single(key) {
    return isBrowser ? prefixed(key) : key;
  },

  singleHyphened(key) {
    let str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, (str,m1) => {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
  },

};
