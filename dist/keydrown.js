/*! Keydrown - v0.0.1 - 2013-04-16 - http://jeremyckahn.github.com/keydrown */
;(function (root) {

var util = (function () {

  var util = {};

  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function} iterator The function to call for each property.
   */
  util.forEach = function (obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty[prop]) {
        iterator(obj[prop]);
      }
    }
  };

  return util;

}());

/**
 * Lookup table of keys to keyCodes.
 * @type {Object.<number>}
 */
var KEY_MAP = {
  'A': 65
  ,'B': 66
  ,'C': 67
  ,'D': 68
  ,'E': 69
  ,'F': 70
  ,'G': 71
  ,'H': 72
  ,'I': 73
  ,'J': 74
  ,'K': 75
  ,'L': 76
  ,'M': 77
  ,'N': 78
  ,'O': 79
  ,'P': 80
  ,'Q': 81
  ,'R': 82
  ,'S': 83
  ,'T': 84
  ,'U': 85
  ,'V': 86
  ,'W': 87
  ,'X': 88
  ,'Y': 89
  ,'Z': 90
  ,'SPACE': 32
  ,'LEFT': 37
  ,'UP': 38
  ,'RIGHT': 39
  ,'DOWN': 40
};

var Key = (function () {

  'use strict';

  /**
   * @param {string} keyName The all-caps name of the key this Object
   * represents.
   * @param {number} keyCode The keyCode that corresponds to `keyName`.
   * @constructor
   */
  function Key (keyName, keyCode) {

  }


  /**
   * Bind a function to be called when the key is held down.
   * @param {function} opt_handler The function to be called when the key is
   * held down.  If omitted, this function invokes whatever handler was
   * previously bound.
   */
  Key.prototype.down = function (opt_handler) {

  };


  /**
   * Bind a function to be called when the key is released.
   * @param {function} opt_handler The function to be called when the key is
   * released.  If omitted, this function invokes whatever handler was
   * previously bound.
   */
  Key.prototype.up = function (opt_handler) {

  };


  /**
   * Remove the handler that was bound with `kd.Key#down`.
   */
  Key.prototype.unbindDown = function () {

  };


  /**
   * Remove the handler that was bound with `kd.Key#up`.
   */
  Key.prototype.unbindUp = function () {

  };

  return Key;

}());

var kd = (function () {

  'use strict';

  var kd = {};
  kd.Key = Key;

  /**
   * @type Array.<string>
   */
  var keysDown = [];


  kd.tick = function () {

  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   * @param {function} handler The function to call on every tick.  You almost
   * certainly want to call `kd.tick` in this function.
   */
  kd.run = function (handler) {

  };


  /**
   * Cancels the loop created by `kd.run`.
   */
  kd.stop = function () {

  };


  return kd;

}());

// Bootstrap the library
if (typeof define === 'function' && define.amd) {
  // Expose Library as an AMD module if it's loaded with RequireJS or
  // similar.
  define(function () {
    return kd;
  });
} else {
  // Load Library normally (creating a Library global) if not using an AMD
  // loader.
  root.kd = kd;
}

} (this));
