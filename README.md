
# Keydrown

## A JavaScript key state handler for web apps

When building games or any application that requires quick reactions from the
user, a system to track key states is needed.  You might say "Silly developer!
There are events for that! They're called `keydown` and `keyup`!"  This is
correct, but the problem that Keydrown solves is more subtle: When you press
and hold any key on the keyboard, there is a brief delay between the initial
firing of the `keydown` event handler and the subsequent firings of that event
for every tick.  Here's an approximate ASCII visualization:

````
TIME (seconds)           KEYDOWN HANDLER FIRING STATE
-----------------------------------------------------

0                        Firing
0.25                     Not firing
0.50                     Not firing
0.75                     Not firing
1                        Firing
1.25                     Firing
1.50                     Firing
1.75                     Firing
2                        Firing
````

...And the handler will just keep firing until the button is released.  The
expectation from the user is that the key handler would be firing for the
entire duration of time that the key is held down - the early ticks where the
`keydown` state is not handled creates a feeling of sluggishness and noticeably
worsens the User Experience.  A way around this delay is to only listen for one
`keydown` event for a button, and execute the key handler on every tick until
the corresponding `keyup` event is detected for that button.

Keydrown makes this super easy.

## API

All Keydrown functionality exists under the `kd` namespace.

### Key Objects

Every letter key, as well as some other keys on the keyboard are represented in
a map of `kd.Key` instances with uppercase key names:

````javascript
kd.A instanceof kd.Key; // true
kd.SPACE instanceof kd.Key; // true
kd.UP instanceof kd.Key; // true
````

You can see the full list of supported keys in
[`kd.map.js`](https://github.com/jeremyckahn/keydrown/blob/master/src/kd.map.js)
(more key codes can easily be added, please submit a Pull Request if you add
more).
[`kd.Key`](http://jeremyckahn.github.io/keydrown/dist/doc/src/kd.key.js.html)
has the following API:

````javascript
/**
 * @param {function=} opt_handler
 */
kd.Key.prototype.down = function (opt_handler)
````

`opt_handler` fires for every tick where the key is held down.  There is
no early delay, as described in the ASCII graph above.  Calling this method for
a key again will overwrite the previous `opt_handler` - only one handler
function is allowed per key.

If `opt_handler` is omitted, this function invokes whatever handler function
was previously bound with `kd.Key#down`.

````javascript
/**
 * @param {function=} opt_handler
 */
kd.Key.prototype.up = function (opt_handler)
````

`opt_handler` fires when the key is released by the user.  As with
`kd.Key#down`, only one handler function is allowed.  Unlike `kd.Key#down`,
`opt_handler` does not fire continuously — only once when the key is released.

If `opt_handler` is omitted, this function invokes whatever handler function
was previously bound with `kd.Key#up`.

````javascript
/**
 * @param {function=} opt_handler
 */
kd.Key.prototype.press = function (opt_handler)
````

`opt_handler` fires once when the key is pressed by the user.  Only one handler
function is allowed.  This is not a repeating state — it only fires once until
the user releases the key and presses it again.

If `opt_handler` is omitted, this function invokes whatever handler function
was previously bound with `kd.Key#press`.

````javascript
kd.Key.prototype.isDown = function()
````

Returns `true` if the key is currently pressed, otherwise returns false.

### Example

````javascript
kd.B.down(function () {
  console.log('The "B" key is being held down!');
});

kd.B.up(function () {
  console.log('The "B" key was released!');
});

kd.SPACE.press(function () {
  console.log('The space bar was pressed!');
});

if (kd.LEFT.isDown()) {
  console.log('The left arrow key is being held down!')
}
````

-------------------------------------------------------------------------------

````javascript
kd.Key.prototype.unbindDown = function ()
````

Unbinds the function handler that was bound with `kd.Key#down`.

````javascript
kd.Key.prototype.unbindUp = function ()
````

Unbinds the function handler that was bound with `kd.Key#up`.

````javascript
kd.Key.prototype.unbindPress = function ()
````

Unbinds the function handler that was bound with `kd.Key#press`.

### Example

````javascript
kd.B.down(function () {
  console.log('The "B" key is being held down!');
});

// Now pressing the "B" key won't do anything
kd.B.unbindDown();
````

-------------------------------------------------------------------------------

### Helper methods

The `kd` Object has helper methods attached to it, and they are represented by
camelCase property names.

````javascript
kd.tick = function ()
````

Check the states of all of the keys and invoke the necessary key handlers.  You
should call this once and only once somewhere in your run loop.  *If you don't
call `tick` somewhere in your run loop, Keydrown won't do anything.*

````javascript
/**
 * @param {function} handler
 */
kd.run = function (handler)
````

A basic run loop.  *If your application already has a run loop, you don't need
this.*  `kd.run` uses `requestAnimationFrame` if it is available, and falls
back to a `setTimeout` loop if it is not.

````javascript
kd.stop = function ()
````

Cancels the run loop started by `kd.run`.

### Example

````javascript
kd.run(function () {
  kd.tick();
});

kd.SPACE.down(function () {
  console.log('The space bar is being held down!');
});

kd.ESC.down(function () {
  console.log('Canceling the loop.');
  kd.stop();
});
````

-------------------------------------------------------------------------------

### Getting the code

If you want to keep things simple, all you need is either `dist/keydrown.js` or
`dist/keydrown.min.js` from this Git repo.  Alternatively, you can install
Keydrown via [Bower](http://bower.io/):

````
$: bower install keydrown
````

### Module compatibility

If loaded directly (without a script loader), Keydrown creates the `kd` browser
global.  However, it can also be loaded as an AMD module or as a CommonJS
module (through a tool like [Browserify](http://browserify.org/)).

````javascript
// Loaded with an AMD loader (such as Require.js)
require(['./path/to/keydrown'], function (kd) {
  kd.run(function () {
    kd.tick();
  });
});
````

````javascript
// Loaded as a CommonJS module, after running it through Browserify or similar
var kd = require('./path/to/keydrown');

kd.run(function () {
  kd.tick();
});
````

### Browser compatibility

Keydrown supports all modern browsers, as well as Internet Explorer 7 and up
(please see the [note below](#limitations) about IE compatibility).

### Limitations

Keydrown has a feature where when the user blurs the browser window (for
example, switching to another application or tab), the key state is reset and
"down" handlers stop firing.  On other words, keys aren't considered "down" if
the user is not focused on the browser window.  This functionality is not
supported in IE 7 and 8, as there doesn't seem to be a way to bind to the
`window`'s `blur` event correctly in those browsers.  You can assign a function
to `window.onblur`, but that function will only fire once IE regains focus,
which is not sufficient for Keydrown's reset-on-blur functionality.

### Keydrown in the wild

Keydrown has been used in several interesting projects:

* [A Node-powered helicopter](https://github.com/isery/node-copter-webapp)
* [PeepsQuest, a game development tutorial](http://peepsquest.com/tutorials/isometric-placing-avatar.html)
* [A role playing game](https://github.com/quintenpalmer/attempt)
* [A WebRTC controlled car](https://github.com/PosMich/WC-Car)

### License

Keydrown is distibuted under the [MIT
license](http://opensource.org/licenses/MIT).  You are encouraged to use and
modify the code to suit your needs, as well as redistribute it.
