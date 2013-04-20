/*! Keydrown - v0.0.0 - 2013-04-20 - http://jeremyckahn.github.com/keydrown */
;(function (window) {

var util = (function () {

  var util = {};

  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function(*, string)} iterator The function to call for each
   * property.
   */
  util.forEach = function (obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty([prop])) {
        iterator(obj[prop], prop);
      }
    }
  };
  var forEach = kd.forEach;


  /**
   * Create a transposed copy of an Object.
   *
   * @param {Object} obj
   * @return {Object}
   */
  util.getTranspose = function (obj) {
    var transpose = {};

    forEach(obj, function (val, key) {
      transpose[val] = key;
    });

    return transpose;
  };


  /**
   * Push a value onto an array if it is not present in the array already.
   * Otherwise, this is a no-op.
   *
   * @param {Array} arr
   * @param {*} val
   */
  util.pushUnique = function (arr, val) {
    if (arr.indexOf(val) !== -1) {
      arr.push(val);
    }
  };


  /**
   * An empty function.  NOOP!
   */
  util.noop = function () {};

  return util;

}());

/**
 * Lookup table of keys to keyCodes.
 *
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


/**
 * The transposed version of KEY_MAP.
 *
 * @type {Object.<string>}
 */
var TRANSPOSED_KEY_MAP = util.getTranspose(KEY_MAP);

var Key = (function (keysDown) {

  'use strict';

  /**
   * @param {string} keyName The all-caps name of the key this Object represents.
   * @param {number} keyCode The keyCode that corresponds to `keyName`.
   * @constructor
   */
  function Key (keyName, keyCode) /*!*/ {
    /*! @type {string} */
    this._keyName = keyName;

    /*! @type {number} */
    this._keyCode = keyCode;
  }


  /*!
   * The function to be invoked on every tick that the key is held down for.
   *
   * @type {function}
   */
  Key.prototype._downHandler = util.noop;


  /*!
   * The function to be invoked when the key is released.
   *
   * @type {function}
   */
  Key.prototype._upHandler = util.noop;


  /**
   * Bind a function to be called when the key is held down.
   *
   * @param {function} opt_handler The function to be called when the key is held down.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.down = function (opt_handler) /*!*/ {
    if (opt_handler) {
      this._downHandler = opt_handler;
    } else {
      this._downHandler();
    }
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @param {function} opt_handler The function to be called when the key is released.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.up = function (opt_handler) /*!*/ {
    if (opt_handler) {
      this._upHandler = opt_handler;
    } else {
      this._upHandler();
    }
  };


  /**
   * Remove the handler that was bound with `kd.Key#down`.
   */
  Key.prototype.unbindDown = function () /*!*/ {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with `kd.Key#up`.
   */
  Key.prototype.unbindUp = function () /*!*/ {
    this._upHandler = util.noop;
  };

  return Key;

/**
 * The variables passed into the closure here are defined in kd.core.js.
 */ /*!*/
}(keysDown));

/*!
 * @type Array.<string>
 */
var keysDown = [];

var kd = (function () {

  'use strict';

  var kd = {};
  kd.Key = Key;


  /**
   * Evaluate which keys are held down and invoke their handler functions.
   */
  kd.tick = function () /*!*/ {

  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   *
   * @param {function} handler The function to call on every tick.  You almost certainly want to call `kd.tick` in this function.
   */
  kd.run = function (handler) /*!*/ {

  };


  /**
   * Cancels the loop created by `kd.run`.
   */
  kd.stop = function () /*!*/ {

  };


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key(keyName, keyCode);
  });


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
  window.kd = kd;
}

} (this));
