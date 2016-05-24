var util = require('./util');

/* insertionSort - use the insertion sort algorithm to sort integers that are
 *                 passed in a space delimited string.
*/
var insertionSort = function(stringValues, callback) {
  console.log("Inside insertionSort!");
  util.cleanse_inputs(stringValues, function(err, values) {
    if (err) {
      console.log("Error found in cleanse_inputs");
      return callback(err);
    }
    var startTime = Date.now();
    var valueToInsert;
    var holePosition;
    var arrayLength = values.length;
    // Perform insertion sort
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

/* getSortStats - creates and returns an object containing the insertion sort
 *                runtime data.
*/
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
