'use strict';

/* App Module */

var honeyDuApp = angular.module('honeyDuApp', [
    'ngRoute', 'ngResource'
]);

honeyDuApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/title.html'
            }).
            when('/:userId', {
                templateUrl: 'partials/main.html',
                controller: 'ToDoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);


//when('/:userId', {
//    templateUrl: 'partials/todo-detail.html',
//    controller: 'ToDoDetailCtrl'
//}).