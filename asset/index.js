;(function () {
  var nativeLogOutput = document.getElementById('native-hold');
  var kdLogOutput = document.getElementById('kd-hold');

  function log(outputEl, text) {
    outputEl.innerHTML += '<pre>' + text + '</pre>';
  }

  function clear (outputEl) {
    outputEl.innerHTML = '';
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 81) {
      log(nativeLogOutput, 'The "Q" key is being held down...?');
    }
  });

  document.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 81) {
      clear(nativeLogOutput);
    }
  });

  kd.P.down(function () {
   log(kdLogOutput, 'The "P" key is being held down!');
  });

  kd.P.up(function () {
   clear(kdLogOutput);
  });

  kd.run(function () {
    kd.tick();
  });
} ());
