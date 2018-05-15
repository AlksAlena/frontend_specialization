'use strict';
/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
  var result = [];
    
  function mainFunc(cb) {
    var timer  = setTimeout(cb, 1000, null, result);

    operations.forEach(function (item, index) {
      item(function(err, res) {
        if (err) { // next('ERROR');
          cb('ERROR');
          clearTimeout(timer);
        }
        else result[index] = res; // next(null, '50ms');
      });     
    });
  }
  
  mainFunc(function(err, res) {
    if (err) callback('ERROR', null);
    else callback(null, res);
  });

};