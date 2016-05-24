angular.module('sortController', [])

	// inject the Sorters service factory into our controller
	.controller('sortController', ['$scope','$http', 'Sorters', function($scope, $http, Sorters) {
		$scope.loading = false;
		$scope.formData= {};
		$scope.formData.sortValues = "";
		$scope.sortedData = {};
		$scope.sortingAlgorithms = [
			'Bubble',
			'Insertion'
		]
		$scope.selectedAlgorithm = $scope.sortingAlgorithms[0];
		$scope.lastSortAlgorithm = "";
		$scope.lastInfoAlgorithm = "";
		$scope.algorithmInfo = "";

		// doSort ==================================================================
		// when submitting the sort form, send the text to the node API
		$scope.doSort = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.sortValues.length > 0) {
				$scope.loading = true;
				$scope.sortedData = {}; // clear any previously sorted data
				$scope.lastSortAlgorithm = $scope.selectedAlgorithm;

				// call the doSort function from our service (returns a promise object)
				Sorters.doSort($scope.selectedAlgorithm, $scope.formData.sortValues)

					// if successful sort, set fields to update display
					.then(function(response) {
						$scope.loading = false;
						$scope.sortedData.values = response.data.result.sortedArray;
						$scope.sortedData.duration = response.data.result.durationMils;
					}, function(response) {
						// Failed to sort values, display server's error message
						$scope.loading = false;
						$scope.sortedData.values = response.data.error;
					});
			}
		};

		// getAlgorithmInfo ========================================================
		// Request algorithm info for the selected algorithm using the node API
		$scope.getAlgorithmInfo = function() {
			$scope.loading = true;
			$scope.algorithmInfo = {};
	  	$scope.lastInfoAlgorithm = $scope.selectedAlgorithm;

			// call the getSort function from our service (returns a promise object)
			Sorters.getSort($scope.selectedAlgorithm)

			// if successful retrieved data, set fields to update display
			.then(function(response) {
				$scope.loading = false;
				$scope.algorithmInfo = response.data.result;
			}, function(response) {
				// Failed to retrieve data, display server's error message
				$scope.loading = false;
				$scope.algorithmInfo = response.data.error;
			})
		}
	}]);
