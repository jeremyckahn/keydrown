/*!
 * @type Array.<string>
 */
var keysDown = [];

var Key = (function () {

  'use strict';

  /**
   * Represents a key on the keyboard.  You'll never actually call this method
   * directly; Key Objects for every key that Keydrown supports are created for
   * you when the library is initialized (as in, when the file is loaded).  You
   * will, however, use the `prototype` methods below to bind functions to key
   * states.
   *
   * @param {number} keyCode The keyCode of the key.
   * @constructor
   * @class kd.Key
   */
  function Key (keyCode) {
    this.keyCode = keyCode;
    this.cachedKeypressEvent = null;
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
   * Private helper function that binds or invokes a hander for `down`, `up',
   * or `press` for a `Key`.
   *
   * @param {Key} key
   * @param {string} handlerName
   * @param {function=} opt_handler If omitted, the handler is invoked.
   * @param {KeyboardEvent=} opt_evt If this function is being called by a
   * keyboard event handler, this is the raw KeyboardEvent Object provided from
   * the browser.
   */
  function bindOrFire (key, handlerName, opt_handler, opt_evt) {
    if (opt_handler) {
      key[handlerName] = opt_handler;
    } else {
      key[handlerName](opt_evt);
    }
  }


  /**
   * Returns whether the key is currently pressed or not.
   *
   * @method isDown
   * @return {boolean} True if the key is down, otherwise false.
   */
  Key.prototype.isDown = function () {
    return util.indexOf(keysDown, this.keyCode) !== -1;
  };


  /**
   * Bind a function to be called when the key is held down.
   *
   * @method down
   * @param {function=} opt_handler The function to be called when the key is
   * held down.  If omitted, this function invokes whatever handler was
   * previously bound.
   */
  Key.prototype.down = function (opt_handler) {
    bindOrFire(this, '_downHandler', opt_handler, this.cachedKeypressEvent);
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @method up
   * @param {function=} opt_handler The function to be called when the key is
   * released.  If omitted, this function invokes whatever handler was
   * previously bound.
   * @param {KeyboardEvent=} opt_evt If this function is being called by the
   * keyup event handler, this is the raw KeyboardEvent Object provided from
   * the browser.  This should generally not be provided by client code.
   */
  Key.prototype.up = function (opt_handler, opt_evt) {
    bindOrFire(this, '_upHandler', opt_handler, opt_evt);
  };


  /**
   * Bind a function to be called when the key is pressed.  This handler will
   * not fire again until the key is released — it does not repeat.
   *
   * @method press
   * @param {function=} opt_handler The function to be called once when the key
   * is pressed.  If omitted, this function invokes whatever handler was
   * previously bound.
   * @param {KeyboardEvent=} opt_evt If this function is being called by the
   * keydown event handler, this is the raw KeyboardEvent Object provided from
   * the browser.  This should generally not be provided by client code.
   */
  Key.prototype.press = function (opt_handler, opt_evt) {
    this.cachedKeypressEvent = opt_evt;
    bindOrFire(this, '_pressHandler', opt_handler, opt_evt);
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/down:method"}}{{/crossLink}}`.
   * @method unbindDown
   */
  Key.prototype.unbindDown = function () {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/up:method"}}{{/crossLink}}`.
   * @method unbindUp
   */
  Key.prototype.unbindUp = function () {
    this._upHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/press:method"}}{{/crossLink}}`.
   * @method unbindPress
   */
  Key.prototype.unbindPress = function () {
    this._pressHandler = util.noop;
  };

  return Key;

}());
