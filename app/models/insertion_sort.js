var _ = require('underscore');
var util = require('./util');

var insertionSort = function(stringValues, callback) {
  console.log("Inside insertionSort!");
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
    for (var i = 1; i < arrayLength; i++) {
      valueToInsert = values[i];
      holePosition = i;

      while ((holePosition > 0) && (values[holePosition - 1] > valueToInsert)) {
        values[holePosition] = values[holePosition - 1];
        --holePosition;
      }
      values[holePosition] = valueToInsert;
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
    spaceReq: 'O(n)'
  }
  return callback(null, stats);
}

module.exports = {
  sort: insertionSort,
  getStats: getSortStats
}
