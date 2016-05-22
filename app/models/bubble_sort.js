var _ = require('underscore');
var util = require('./util');

var bubbleSort = function(stringValues, callback) {
  console.log("Inside bubbleSort!");
/*  if (!stringValues) {
    return callback("Error: No inputs provided");
  } else if (/[^0-9 ]/.test(stringValues)) {
    console.log("Invalid character was entered");
    return callback("Error: invalid character entered");
  } else {
    console.log("Passed regular expression test");
    var arrayInput = stringValues.split(' ');
    var unsortedArray = _.map(arrayInput, function(intString) {
      return parseInt(intString);
    });
    var values = _.filter(unsortedArray, function(value) {
      return value;
    }); */
  util.cleanse_inputs(stringValues, function(err, values) {
    if (err) {
      console.log("Error found in cleanse_inputs");
      return callback(err);
    }
    var startTime = Date.now();
    var valueToInsert;
    var holePosition;
    var arrayLength = values.length;
    var swapped;
    // Perform bubble sort
    for (var i = 0; i < arrayLength; i++) {
      swapped = false;
      for (var j = 0; j < arrayLength; j++) {
        if (values[j] > values[j + 1]) {
          var temp = values[j];
          values[j] = values[j + 1];
          values[j + 1] = temp;
          swapped = true;
        }
      }
      if (!swapped) {
        break;
      }
    }
    var endTime = Date.now();
    var result = {
      sortedArray: values,
      durationMils: (endTime - startTime)
    }
    return callback(null, result);
  })
}

var getSortStats = function(callback) {
  var stats = {
    worstCase: 'O(n*n)',
    bestCase: 'O(n)',
    averageCase: 'O(n*n)',
    spaceReq: 'O(1)'
  }
  return callback(null, stats);
}

module.exports = {
  sort: bubbleSort,
  getStats: getSortStats
}
