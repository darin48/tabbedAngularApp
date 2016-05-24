angular.module('tabController', [])

	// inject the Todo service factory into our controller
	.controller('tabController', ['$scope', function($scope) {
     $scope.tabs = {
	     sort: 'tabs.sort',
	     todo: 'tabs.todo'
	   };
	}]);
