
"use strict";

angular.module('myApp')
  .controller('UserController', ['$scope', 'UserService', '$location', function($scope, UserService, $location){
    $scope.UserService = UserService;
    $scope.register = function() {
      console.log('Test', $scope.user);
      if(!$scope.user.username && $scope.user.first_name && $scope.user.last_name && $scope.user.password && $scope.user.email){
        $scope.error = "Please completely fill out form";
        return false;
      }
      UserService.register($scope.user).success(function(result){
        $location.url('/');
      }).error(function(error){
        $scope.error = "Please try again";
      });
    };
    $scope.login = function(){
      UserService.login($scope.user).success(function(result) {
        $location.url('/');
      }).error(function(error) {
          $scope.error ="Wrong username or password";
      });
    };
    // $scope.isAuthenticated=function() {
    //   UserService.isAuthenticated();
    // };
  }]);