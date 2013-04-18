var util = (function () {

  var util = {};

  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function(Object, string)} iterator The function to call for each
   * property.
   */
  util.forEach = function (obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty([prop])) {
        iterator(obj[prop], prop);
      }
    }
  };


  /**
   * An empty function.  NOOP!
   */
  util.noop = function () {};

  return util;

}());