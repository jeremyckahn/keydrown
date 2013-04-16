var kd = {};


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
