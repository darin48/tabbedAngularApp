var insertionSort = require('../models/insertion_sort.js');
var bubbleSort = require('../models/bubble_sort.js');
var express = require('express');
var router = express.Router();

router.post('/:selectedAlgorithm', function(req, res) {
  var selectedAlgorithm = req.params.selectedAlgorithm;
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
  if (!req.body.hasOwnProperty('values')) {
    var result = {
      status: 'failed',
      error: "Error: Invalid request"
    }
    return res.status(500).json(result);
  }
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
    return res.status(200).json(result);
  });
})

router.get('/:selectedAlgorithm', function(req, res) {
  var selectedAlgorithm = req.params.selectedAlgorithm;
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
