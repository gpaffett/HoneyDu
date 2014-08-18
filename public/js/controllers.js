'use strict';

/* Controllers */
var ToDoCtrl = function ($scope, $modal, $routeParams, $log, ToDos) {

    init();

    function init() {
        ToDos.query({'field': 'assignedTo',
            'value': $routeParams.userId});
    }

    $scope.addTodo = function addTodo() {

        ToDos.post({}, function (todos) {
            console.log("Success! " + todos);
            $scope.todos = todos;
        }, function () {
            console.log("Failure!");
            $scope.message = 'UhOh';
        });
    }

    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/addTodo.html',
            controller: ModalInstanceCtrl,
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
}

honeyDuApp.controller('ToDoCtrl', ['$scope', '$modal', '$routeParams', '$log', 'ToDos',
    ToDoCtrl ]);

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
