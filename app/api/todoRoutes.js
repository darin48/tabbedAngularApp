var Todo = require('../models/todo');
var express = require('express');
var router = express.Router();

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}
;

// api ---------------------------------------------------------------------
// get all todos
router.get('/', function (req, res) {
  console.log("Inside get /");
  // use mongoose to get all todos in the database
  getTodos(res);
});

// create todo and send back all todos after creation
router.post('/', function (req, res) {
  console.log("Inside post /");
  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    text: req.body.text,
    done: false
  }, function (err, todo) {
    if (err)
      res.send(err);

      // get and return all the todos after you create another
      getTodos(res);
    });
});

// delete a todo
router.delete('/:todo_id', function (req, res) {
  console.log("Inside delete /:todo_id for: " + req.params.todo_id);
  Todo.remove({
    _id: req.params.todo_id
  }, function (err, todo) {
    if (err)
      res.send(err);

      getTodos(res);
    });
});

    // application -------------------------------------------------------------
router.get('*', function (req, res) {
  res.sendFile(__dirname + '../../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;