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
