'use strict';

/* Controllers */
honeyDuApp.controller('ToDoCtrl', ['$scope', '$routeParams', 'ToDos',
    function ($scope, $routeParams, ToDos) {

        ToDos.query({'field': 'assignedTo',
            'value': $routeParams.userId
        }, function (todos) {
            console.log("Success! " + todos);
            $scope.todos = todos;
        }, function () {
            console.log("Failure!");
            $scope.message = 'UhOh';
        });

    }]);

honeyDuApp.controller('UserCtrl', ['$scope', '$window', '$location', 'AuthService',
    function ($scope, $window, $location, AuthService) {
        //$scope.user = {username: 'john.doe', password: 'foobar'};
        $scope.message = '';

        $scope.login = function () {
            AuthService.post($scope.user, function (data) {
                $window.sessionStorage.token = data.token;
                $scope.message = 'Welcome';
                $location.path('/gpaffett');
            }, function () {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;

                // Handle login errors here
                $scope.message = 'Error: Invalid user or password';
            });
        };
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
