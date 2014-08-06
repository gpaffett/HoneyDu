'use strict';

/* Controllers */
honeyDuApp.controller('ToDoCtrl', ['$scope', '$routeParams', 'ToDos',
  function($scope, $routeParams, ToDos) {

    ToDos.query({'field': 'assignedTo',
                                'value': $routeParams.userId}, function(todos) {
        $scope.todos = todos;
    });

  }]);

//honeyDuApp.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//  function($scope, $routeParams, Phone) {
//    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//      $scope.mainImageUrl = phone.images[0];
//    });

//    $scope.setImage = function(imageUrl) {
//      $scope.mainImageUrl = imageUrl;
//    }
//  }]);
