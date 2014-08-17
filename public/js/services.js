'use strict';

/* Services */

honeyDuApp.factory('ToDos', ['$resource',
  function($resource){
    return $resource('todos/:id', {id: '@id'}, {
      update: {method:'PUT'}
    });
  }]);


honeyDuApp.factory('UsersToDos', ['$resource',
    function($resource){
        return $resource('todos/assignedTo/:userId', {}, {
            query: {method:'GET'},
            update: {method:'PUT'}
        });
    }]);

honeyDuApp.factory('AuthService', ['$resource',
    function($resource){
        return $resource('authenticate/', {}, {
              'post':   {method:'POST'}
        });
    }]);

honeyDuApp.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});