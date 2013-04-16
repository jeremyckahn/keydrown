/**
 * @param {string} keyName The all-caps name of the key this Object represents.
 * @param {number} keyCode The keyCode that corresponds to `keyName`.
 * @constructor
 */
function Key (keyName, keyCode) {

}
kd.Key = Key;


/**
 * Bind a function to be called when the key is held down.
 * @param {function} opt_handler The function to be called when the key is held
 * down.  If omitted, this function invokes whatever handler was previously
 * bound.
 */
Key.prototype.down = function (opt_handler) {

};


/**
 * Bind a function to be called when the key is released.
 * @param {function} opt_handler The function to be called when the key is
 * released.  If omitted, this function invokes whatever handler was previously
 * bound.
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
