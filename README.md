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
