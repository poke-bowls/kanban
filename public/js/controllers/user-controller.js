
"use strict";

angular.module('myApp')
  .controller('UserController', ['$scope', 'UserService', function($scope, UserService){
    $scope.UserService = UserService;
    $scope.login = function(){
      UserService.login($scope.user);
    };
  }]);