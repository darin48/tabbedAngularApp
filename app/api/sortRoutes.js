var insertionSort = require('../models/insertion_sort.js');
var bubbleSort = require('../models/bubble_sort.js');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  var selectedAlgorithm = req.body.algorithm;
  console.log("selectedAlgorithm is: " + selectedAlgorithm);
  var sortFunction;
  switch (selectedAlgorithm) {
    case 'Insertion':
      sortFunction = insertionSort.sort;
      break;
    case 'Bubble':
      sortFunction = bubbleSort.sort;
      break;
    default:
      sortFunction = insertionSort.sort;
      break;
  }
  console.log("Inside post / of sorters with body: " + JSON.stringify(req.body));
  sortFunction(req.body.values, function(err, data) {
    if (err) {
      var result = {
        status: 'failed',
        error: err
      }
      return res.status(500).json(result);
    }
    var result = {
      status: 'success',
      result: data
    }
    console.log("Done sorting, returning: " + JSON.stringify(result));
    return res.status(200).json(result);
  });
})

router.get('/:selectedAlgorithm', function(req, res) {
  var selectedAlgorithm = req.params.selectedAlgorithm;
  console.log("selectedAlgorithm is: " + selectedAlgorithm);
  var statFunction;
  switch (selectedAlgorithm) {
    case 'Insertion':
      statFunction = insertionSort.getStats;
      break;
    case 'Bubble':
      statFunction = bubbleSort.getStats;
      break;
    default:
      statFunction = null;
      break;
  }
  console.log("Inside get /:selectedAlgorithm of sorters with param: " + JSON.stringify(req.params));
  if (statFunction) {
    statFunction(function(err, data) {
      if (err) {
        var result = {
          status: 'failed',
          error: err
        }
        res.status(500).json(result);
      }
      var result = {
        status: 'success',
        result: data
      }
      console.log("Success, returning: " + JSON.stringify(result));
      res.status(200).json(result);
    });
  } else {
    var result = {
      status: 'failed',
      error: "Error: Invalid algorithm specified"
    }
    res.status(404).json(result);
  }
})

    // application -------------------------------------------------------------
router.get('*', function (req, res) {
  res.sendFile(__dirname + '../../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
