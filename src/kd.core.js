var kd = (function (keysDown) {

  'use strict';

  var kd = {};
  kd.Key = Key;

  var isRunning = false;


  /**
   * Evaluate which keys are held down and invoke their handler functions.
   */
  kd.tick = function () {
    var i, len = keysDown.length;
    for (i = 0; i < len; i++) {
      var keyCode = keysDown[i];

      var keyName = TRANSPOSED_KEY_MAP[keyCode];
      if (keyName) {
        kd[keyName].down();
      }
    }
  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   *
   * @param {function} handler The function to call on every tick.  You almost certainly want to call `kd.tick` in this function.
   */
  kd.run = function (handler) {
    isRunning = true;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler();
    });
  };


  /**
   * Cancels the loop created by [`kd.run`](#run).
   */
  kd.stop = function () {
    isRunning = false;
  };


  // SETUP
  //


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key(keyCode);
  });

  util.documentOn('keydown', function (evt) {
    var keyCode = evt.keyCode;
    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    var isNew = util.pushUnique(keysDown, keyCode);

    if (isNew && kd[keyName]) {
      kd[keyName].press();
    }
  });

  util.documentOn('keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up();
    }
  });

  // Stop firing the "down" handlers if the user loses focus of the browser
  // window.
  util.documentOn('blur', function (evt) {
    // Fire the "up" handler for each key that is currently held down
    util.forEach(keysDown, function (keyCode) {
      var mappedKey = TRANSPOSED_KEY_MAP[keyCode];
      if (mappedKey) {
        kd[mappedKey].up();
      }
    });

    keysDown.length = 0;
  });


  return kd;

/*!
 * The variables passed into the closure here are defined in kd.key.js.
 */ /*!*/
}(keysDown));
