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
entire duration of time that key is held down - the early ticks where the
`keydown` state is not handled creates a feeling of sluggishness and noticeably
worsens the User Experience.  A way around this delay is to only listen for one
`keydown` event for a button, and execute the key handler on every tick until
the `keyup` event is detected for that button.

Keydrown makes this super easy.

## API

All Keydrown functionality exists under the `kd` namespace.

### Key Objects

Every letter key, as well as some other keys on the keyboard are represented in
a map of Objects with uppercase key names:

````javascript
typeof kd.A;       // object
typeof kd.SPACE;   // object
typeof kd.UP;      // object
````

These uppercased Objects are subclasses of `kd.Key`.  `kd.Key` has the
following API, and by extension, so do the KEY Objects:

````javascript
/**
 * @param {function} handler
 */
kd.Key.prototype.down = function (handler)
````

`handler` fires for every tick where there is a key is held down.  There is no
early delay, as described in the ASCII graph above.

````javascript
/**
 * @param {function} handler
 */
kd.Key.prototype.up = function (handler)
````

`handler` fires when the key is released by the user.

### Example

````javascript
kd.B.down(function () {
  console.log('The "B" key is being held down!');
});

kd.B.up(function () {
  console.log('The "B" key was released!');
});
````


### Helper methods

The `kd` Object has helper methods and properties associated with it, and they
are represented by camel case property names.

````javascript
kd.tick = function ()
````

Check the states of all of the keys and invoke the necessary key handlers.  You
should call this once and only once somewhere in your run loop.  *If you don't
have this somewhere in your run loop, Keydrown won't do anything.*

````javascript
/**
 * @param {function} handler
 */
kd.run = function (handler)
````

A basic run loop.  If your application already has a run loop, you don't need
this.  `kd.run` uses `requestAnimationFrame` if it is available, and falls back
to a `setTimeout` loop if it is not.

````javascript
kd.stop = function ()
````

Cancels the run loop started by `kd.run`.

### Example

````javascript
kd.SPACE.down(function () {
  console.log('The space bar is being held down!');
});

kd.ESC.down(function () {
  console.log('Canceling the loop.');
  kd.stop();
});

kd.run(function () {
  kd.tick();
});
````
