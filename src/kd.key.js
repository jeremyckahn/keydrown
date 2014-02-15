/*!
 * @type Array.<string>
 */
var keysDown = [];

var Key = (function () {

  'use strict';

  /**
   * Represents a key on the keyboard.  You'll never actually call this method directly; Key Objects for every key that Keydrown supports are created for you when the library is initialized (as in, when the file is loaded).  You will, however, use the `prototype` methods below to bind functions to key states.
   *
   * @param {number} keyCode The keyCode of the key.
   * @constructor
   */
  function Key (keyCode) {
    this.keyCode = keyCode;
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


  /*!
   * The function to be invoked when the key is pressed.
   *
   * @type {function}
   */
  Key.prototype._pressHandler = util.noop;


  /*!
   * Private helper function that binds or invokes a hander for `down`, `up', or `press` for a `Key`.
   *
   * @param {Key} key
   * @param {string} handlerName
   * @param {function=} opt_handler If omitted, the handler is invoked.
   */
  function bindOrFire (key, handlerName, opt_handler) {
    if (opt_handler) {
      key[handlerName] = opt_handler;
    } else {
      key[handlerName]();
    }
  }


  /**
   * Returns whether the key is currently pressed or not.
   *
   * @return {boolean} True if the key is down, otherwise false.
   */
  Key.prototype.isDown = function () {
    return util.indexOf(keysDown, this.keyCode) !== -1;
  };


  /**
   * Bind a function to be called when the key is held down.
   *
   * @param {function=} opt_handler The function to be called when the key is held down.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.down = function (opt_handler) {
    bindOrFire(this, '_downHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @param {function=} opt_handler The function to be called when the key is released.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.up = function (opt_handler) {
    bindOrFire(this, '_upHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is pressed.  This handler will not fire again until the key is released — it does not repeat.
   *
   * @param {function=} opt_handler The function to be called once when the key is pressed.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.press = function (opt_handler) {
    bindOrFire(this, '_pressHandler', opt_handler);
  };


  /**
   * Remove the handler that was bound with [`kd.Key#down`](#down).
   */
  Key.prototype.unbindDown = function () {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#up`](#up).
   */
  Key.prototype.unbindUp = function () {
    this._upHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#press`](#press).
   */
  Key.prototype.unbindPress = function () {
    this._pressHandler = util.noop;
  };

  return Key;

}());
