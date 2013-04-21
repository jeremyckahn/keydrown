/*!
 * @type Array.<string>
 */
var keysDown = [];

var Key = (function () {

  'use strict';

  /**
   * Represents a key on the keyboard.  You'll never actually call this method directly; Key Objects for every key that Keydrown supports are created for you when the library is initialized (as in, when the file is loaded).  You will, however, use the `prototype` methods below to bind functions to key states.
   * @constructor
   */
  function Key () /*!*/ {}


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
   * Remove the handler that was bound with [`kd.Key#down`](#down).
   */
  Key.prototype.unbindDown = function () /*!*/ {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#up`](#up).
   */
  Key.prototype.unbindUp = function () /*!*/ {
    this._upHandler = util.noop;
  };

  return Key;

}());
