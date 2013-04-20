/*!
 * @type Array.<string>
 */
var keysDown = [];

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
