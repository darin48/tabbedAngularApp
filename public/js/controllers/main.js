var app = angular.module('todoSortTabs', ['ui.router', 'tabController', 'sortController', 'todoController', 'sortService', 'todoService']);

app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/todo');
		$stateProvider
		 .state('tabs', {
			 url:"",
	     abstract: true,
			 templateUrl: "tabs.html",
	     controller: 'tabController'
		 })
		 .state('tabs.sort', {
			 url:"/sort",
			 views: {
				 "tabView": {
			     templateUrl:"sort.html",
					 controller: 'sortController'
				 }
			 }
		 })
		 .state("tabs.todo", {
			 url:"/todo",
			 views: {
				 "tabView": {
			     templateUrl:"todo.html",
					 controller: 'todoController'
				 }
			 }
		 })
	});
