angular.module('sortService', [])

	// super simple service
	// each function returns a promise object
	.factory('Sorters', ['$http',function($http) {
		return {
			getSort : function(functionName) {
				return $http.get('/api/sort/' + functionName);
			},
			doSort : function(functionName, unsortedValues) {
				return $http.post('/api/sort/' + functionName, {values: unsortedValues});
			},
		}
	}]);
