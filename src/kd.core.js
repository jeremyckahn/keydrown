var kd = (function (keysDown) {

  'use strict';

  /**
   * @class kd
   */
  var kd = {};
  kd.Key = Key;

  var isRunning = false;

  var now = Date.now
     ? Date.now
     : function () {return +new Date();};

  var previousUpdateTime = now();

  /**
   * Evaluate which keys are held down and invoke their handler functions.
   * @method tick
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
   * @param {Function(number, number)} handler The callback function to call on
   * every tick.  You likely want to call [kd.tick](#method_tick) in this
   * function.  This callback receives the time elapsed since the previous
   * execution of the callback as the first parameter, and the current time
   * stamp as the second.
   * @method run
   */
  kd.run = function (handler) {
    isRunning = true;
    var currentTime = now();
    var timeSinceLastUpdate = currentTime - previousUpdateTime;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler(timeSinceLastUpdate, currentTime);
    });

    previousUpdateTime = currentTime;
  };


  /**
   * Cancels the loop created by [run](#method_run).
   * @method stop
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
    var key = kd[keyName];

    if (key) {
      var cachedKeypressEvent = key.cachedKeypressEvent || {};

      // If a modifier key was held down the last time that this button was
      // pressed, and it is pressed again without the modifier key being
      // released, it is considered a newly-pressed key.  This is to work
      // around the fact that the "keyup" event does not fire for the modified
      // key until the modifier button is also released, which poses a problem
      // for repeated, modified key presses such as hitting ctrl/meta+Z for
      // rapid "undo" actions.
      if (cachedKeypressEvent.ctrlKey ||
          cachedKeypressEvent.shiftKey ||
          cachedKeypressEvent.metaKey) {
        isNew = true;
      }

      if (isNew) {
        key.press(null, evt);
      }
    }
  });

  util.documentOn('keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up(null, evt);
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

 // The variables passed into the closure here are defined in kd.key.js.
}(keysDown));
