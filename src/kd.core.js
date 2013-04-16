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


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key(keyName, keyCode);
  });


  return kd;

}());
