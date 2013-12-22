if (typeof module === "object" && typeof module.exports === "object") {
  // Keydrown was loaded as a CommonJS module (by Browserify, for example).
  module.exports = kd;
} else if (typeof define === "function" && define.amd) {
  // Keydrown was loaded as an AMD module.
  define(function () {
    return kd;
  });
} else {
  window.kd = kd;
}
