# Node Sort/Todo tabbed App

A simple Node app built with MongoDB, Angular, and angular-ui-router. For demonstration purposes of using
angular-ui-router to support a tabbed user interface. Each tab's frontend and backend code has been
separated to keep increase cohesion.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores the todos.
Integer sorting and algorithm information comes from the Node server.

The todo tab code uses the scotch-io code found at:
(https://scotch.io/tutorials/node-and-angular-to-do-app-controllers-and-services)

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`

## Installation

1. Clone the repository: `git clone git@github.com:scotch-io/node-todo`
2. Install the application: `npm install`
3. Run grunt to perform setup: `grunt`
4. Place your own MongoDB URI in `config/database.js`
5. Start the server: `node server.js`
6. View in browser at `http://localhost:8080`

## Tests
There is a set of automated tests stored in /spec that can be run by entering: `npm test`.
The automated tests utilize jasmine-node to execute the tests and perform the
assertions. At this point, only the node API is tested.
