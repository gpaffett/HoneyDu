'use strict';

/* App Module */

var honeyDuApp = angular.module('honeyDuApp', [
    'ngRoute', 'ngResource'
]);

honeyDuApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/title.html'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'UserCtrl'
            }).
            when('/:userId', {
                templateUrl: 'partials/main.html',
                controller: 'ToDoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

            $httpProvider.interceptors.push('authInterceptor');
    }]);


//when('/:userId', {
//    templateUrl: 'partials/todo-detail.html',
//    controller: 'ToDoDetailCtrl'
//}).