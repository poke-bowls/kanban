
"use strict";

angular.module('myApp')
  .controller('UserController', ['$scope', 'UserService', '$location', function($scope, UserService, $location){
    $scope.UserService = UserService;
    $scope.login = function(){
      UserService.login($scope.user).success(function(result) {
        if(result) {
          $location.url('/');
        } else {
          $scope.error ="Wrong username or password";
        }
      }).error(function(error) {
        $scope.error="Could not reach server";
      });
    };
    // $scope.isAuthenticated=function() {
    //   UserService.isAuthenticated();
    // };
  }]);