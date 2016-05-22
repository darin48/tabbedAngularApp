angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', 'Sorters', function($scope, $http, Todos, Sorters) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.sortedData = {};
		$scope.sortingAlgorithms = [
			'Bubble',
			'Insertion'
		]
		$scope.selectedAlgorithm = $scope.sortingAlgorithms[0];
		$scope.algorithmInfo = "";

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log("Inside createTodo");
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		// Sort ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.doSort = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.sortValues.length > 0) {
				$scope.loading = true;
				$scope.sortedData = {}; // clear the form so our user is ready to enter another

				// call the create function from our service (returns a promise object)
				Sorters.doSort($scope.selectedAlgorithm, $scope.formData.sortValues)

					// if successful creation, call our get function to get all the new todos
					.then(function(response) {
						$scope.loading = false;
						console.log("response is: " + JSON.stringify(response));
						$scope.sortedData.values = response.data.result.sortedArray; // clear the form so our user is ready to enter another
						$scope.sortedData.duration = response.data.result.durationMils; // clear the form so our user is ready to enter another
					}, function(response) {
						$scope.loading = false;
						$scope.sortedData.values = response.data.error;
					});
			}
		};

		$scope.getAlgorithmInfo = function() {
			$scope.loading = true;
			$scope.algorithmInfo = {};

			Sorters.getSort($scope.selectedAlgorithm)
			.then(function(response) {
				$scope.loading = false;
				console.log("response is: " + JSON.stringify(response));
				$scope.algorithmInfo = response.data.result;
			}, function(response) {
				$scope.loading = false;
				$scope.algorithmInfo = response.data.error;
			})
		}
	}]);
