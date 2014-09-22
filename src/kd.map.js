/**
 * Lookup table of keys to keyCodes.
 *
 * @type {Object.<number>}
 */
var KEY_MAP = {
  'A': 65
  ,'B': 66
  ,'C': 67
  ,'D': 68
  ,'E': 69
  ,'F': 70
  ,'G': 71
  ,'H': 72
  ,'I': 73
  ,'J': 74
  ,'K': 75
  ,'L': 76
  ,'M': 77
  ,'N': 78
  ,'O': 79
  ,'P': 80
  ,'Q': 81
  ,'R': 82
  ,'S': 83
  ,'T': 84
  ,'U': 85
  ,'V': 86
  ,'W': 87
  ,'X': 88
  ,'Y': 89
  ,'Z': 90
  ,'ENTER': 13
  ,'SHIFT': 16
  ,'ESC': 27
  ,'SPACE': 32
  ,'LEFT': 37
  ,'UP': 38
  ,'RIGHT': 39
  ,'DOWN': 40
  ,'BACKSPACE': 8
  ,'DELETE': 46
};


/**
 * The transposed version of KEY_MAP.
 *
 * @type {Object.<string>}
 */
var TRANSPOSED_KEY_MAP = util.getTranspose(KEY_MAP);
