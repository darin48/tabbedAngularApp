angular.module('sortService', [])

	// super simple service
	// each function returns a promise object
	.factory('Sorters', ['$http',function($http) {
		return {
			getSort : function(functionName) {
				return $http.get('/api/sort/' + functionName);
			},
			doSort : function(functionName, unsortedValues) {
				return $http.post('/api/sort', {algorithm: functionName, values: unsortedValues});
			},
/*			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			} */
		}
	}]);
