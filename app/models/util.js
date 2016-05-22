_ = require('underscore');

var cleanse_inputs = function(valuesString, callback) {
  if (!valuesString) {
    return callback("Error: No inputs provided");
  } else if (/[^0-9 ]/.test(valuesString)) {
    console.log("Invalid character was entered");
    return callback("Error: invalid character entered");
  } else {
    console.log("Passed regular expression test");
    var arrayInput = valuesString.split(' ');
    var unsortedArray = _.map(arrayInput, function(intString) {
      return parseInt(intString);
    });
    var values = _.filter(unsortedArray, function(value) {
      return value;
    });
    return callback(null, values);
  }
}

module.exports = {
  cleanse_inputs: cleanse_inputs
}
