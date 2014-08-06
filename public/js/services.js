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