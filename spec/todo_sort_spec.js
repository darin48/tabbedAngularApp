var request = require("request");
var _ = require("underscore");

var base_url = "http://localhost:8080/";

describe("Todo Sort Test", function() {
  describe("GET /api/sort/Insertion", function() {
    it("returns status code 200", function(done) {
      request.get(base_url + "api/sort/Insertion", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("returns success, worstCase, bestCase, averageCase, spaceReq", function(done) {
      request.get(base_url + "api/sort/Insertion", function(error, response, body) {
        var info = JSON.parse(body);
        expect(info.status).toBe("success");
        expect(info.result.worstCase).toBeDefined();
        expect(info.result.bestCase).toBeDefined();
        expect(info.result.averageCase).toBeDefined();
        expect(info.result.spaceReq).toBeDefined();
        done();
      });
    });
  });

  describe("GET /api/sort/Bubble", function() {
    it("returns status code 200", function(done) {
      request.get(base_url + "api/sort/Bubble", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("returns success, worstCase, bestCase, averageCase, spaceReq", function(done) {
      request.get(base_url + "api/sort/Insertion", function(error, response, body) {
        var info = JSON.parse(body);
        expect(info.status).toBe("success");
        expect(info.result.worstCase).toBeDefined();
        expect(info.result.bestCase).toBeDefined();
        expect(info.result.averageCase).toBeDefined();
        expect(info.result.spaceReq).toBeDefined();
        done();
      });
    });
  });

  describe("GET /api/sort/Invalid", function() {
    it("returns status code 404 and error", function(done) {
      request.get(base_url + "api/sort/Invalid", function(error, response, body) {
        expect(response.statusCode).toBe(404);
        var info = JSON.parse(body);
        expect(info.status).toBe("failed");
        expect(info.error).toBe("Error: Invalid algorithm specified");
        done();
      });
    });
  });

  describe("POST /api/sort/Insertion", function() {
    it("returns status code 200, sortedArray, and durationMils", function(done) {
      request.post({url: base_url + "api/sort/Insertion", form: {values: "5 4 3 2 1 0 -1"}}, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        var info = JSON.parse(body);
        expect(info.status).toBe("success");
        expect(info.result.sortedArray).toEqual([-1, 0, 1, 2, 3, 4, 5]);
        expect(info.result.durationMils).toBeGreaterThan(-1);
        done();
      });
    });
    it("returns status code 500 and error for invalid input", function(done) {
      request.post({url: base_url + "api/sort/Insertion", form: {values: "5 q4 3 2 1 0 -1"}}, function(error, response, body) {
        expect(response.statusCode).toBe(500);
        var info = JSON.parse(body);
        expect(info.status).toBe("failed");
        expect(info.error).toBe("Error: invalid character entered");
        done();
      });
    });
    it("returns status code 500 and error for missing input", function(done) {
      request.post({url: base_url + "api/sort/Insertion", form: {values: ""}}, function(error, response, body) {
        expect(response.statusCode).toBe(500);
        var info = JSON.parse(body);
        expect(info.status).toBe("failed");
        expect(info.error).toBe("Error: No inputs provided");
        done();
      });
    });
    it("returns status code 500 and error for incorrectly named input", function(done) {
      request.post({url: base_url + "api/sort/Insertion", form: {vals: "5 4 3 2 1"}}, function(error, response, body) {
        expect(response.statusCode).toBe(500);
        var info = JSON.parse(body);
        expect(info.status).toBe("failed");
        expect(info.error).toBe("Error: Invalid request");
        done();
      });
    });
  });

  describe("POST /api/sort/Bubble", function() {
    it("returns status code 200, sortedArray, and durationMils", function(done) {
      request.post({url: base_url + "api/sort/Bubble", form: {values: "5 4 3 2 1 0 -1"}}, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        var info = JSON.parse(body);
        expect(info.status).toBe("success");
        expect(info.result.sortedArray).toEqual([-1, 0, 1, 2, 3, 4, 5]);
        expect(info.result.durationMils).toBeGreaterThan(-1);
        done();
      });
    });
    it("returns status code 500 and error for invalid input", function(done) {
      request.post({url: base_url + "api/sort/Bubble", form: {values: "5 q4 3 2 1 0 -1"}}, function(error, response, body) {
        expect(response.statusCode).toBe(500);
        var info = JSON.parse(body);
        expect(info.status).toBe("failed");
        expect(info.error).toBe("Error: invalid character entered");
        done();
      });
    });
    it("returns status code 500 and error for missing input", function(done) {
      request.post({url: base_url + "api/sort/Bubble", form: {values: ""}}, function(error, response, body) {
        expect(response.statusCode).toBe(500);
        var info = JSON.parse(body);
        expect(info.status).toBe("failed");
        expect(info.error).toBe("Error: No inputs provided");
        done();
      });
    });
    it("returns status code 500 and error for incorrectly named input", function(done) {
      request.post({url: base_url + "api/sort/Bubble", form: {vals: "5 4 3 2 1"}}, function(error, response, body) {
        expect(response.statusCode).toBe(500);
        var info = JSON.parse(body);
        expect(info.status).toBe("failed");
        expect(info.error).toBe("Error: Invalid request");
        done();
      });
    });
  });

  describe("POST/GET/DELETE /api/todos", function() {
    var postedTodo = undefined;
    it("POST returns status code 200, todo data including new Todo", function(done) {
      var myTestTodoText = "Test todo";
      request.post({url: base_url + "api/todos", form: {text: myTestTodoText}}, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        var info = JSON.parse(body);
        console.log("todos body is: " + JSON.stringify(info));
        var myTodo = _.find(info, function(todo) {
          return (todo.text === myTestTodoText);
        });
        if (myTodo) {
          postedTodo = myTodo;
        }
        expect(myTodo).toBeDefined();
        done();
      });
    });
    it("GET returns status code 200, todo data", function(done) {
      request.get(base_url + "api/todos", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        var info = JSON.parse(body);
        expect(info.length).toBeGreaterThan(0);
        done();
      });
    });
    it("DELETE returns status code 200, todo data without deleted todo", function(done) {
      var myTestTodoID = postedTodo._id;
      request.delete(base_url + "api/todos/" + myTestTodoID, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        var info = JSON.parse(body);
        console.log("todos body is: " + JSON.stringify(info));
        var myTodo = _.find(info, function(todo) {
          return (todo._id === myTestTodoID);
        });
        expect(myTodo).not.toBeDefined();
        done();
      });
    });
  });
});
