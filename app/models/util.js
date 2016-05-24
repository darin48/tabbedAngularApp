_ = require('underscore');

/* cleanse_inputs - Convert input string of space delmited values into array
 *                  of numbers
*/
var cleanse_inputs = function(valuesString, callback) {
  if (!valuesString || (valuesString.length === 0)) {
    return callback("Error: No inputs provided");
  } else if (/[^\-0-9 ]/.test(valuesString)) { // Check for invalid characters
    console.log("Invalid character was entered");
    return callback("Error: invalid character entered");
  } else {
    var arrayInput = valuesString.split(' ');
    // Map all input string values to their integer values
    var unsortedArray = _.map(arrayInput, function(intString) {
      return parseInt(intString);
    });
    // Filter out the invalid numbers
    var values = _.filter(unsortedArray, function(value) {
      return !isNaN(value);
    });
    return callback(null, values);
  }
}

module.exports = {
  cleanse_inputs: cleanse_inputs
}
