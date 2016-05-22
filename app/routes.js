var Todo = require('./models/todo');
//var insertionSort = require('./models/insertion_sort.js');

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

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

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
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

/*    app.post('/api/insertionSort', function(req, res) {
      insertionSort.sort(req.body.values, function(err, data) {
        if (err) {
          var result = {
            status: 'failed',
            error: 'err'
          }
          res.status(500).json(result);
        }
        var result = {
          status: 'success',
          result: data
        }
        res.status(200).json(result);
      });
    })

    app.get('/api/insertionSort', function(req, res) {
      insertionSort.sort(req.body.values, function(err, data) {
        if (err) {
          var result = {
            status: 'failed',
            error: 'err'
          }
          res.status(500).json(result);
        }
        var result = {
          status: 'success',
          result: data
        }
        res.status(200).json(result);
      });
    }) */

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
