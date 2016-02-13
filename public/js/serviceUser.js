
"use strict";

angular.module('myApp')
  .service('UserService', ['$http', function($http){
    this.getUsers = function(){
      return $http.get('http://localhost:3000/api/users');
    };
    this.login = function(user) {
      return $http.post('/login', user);
    };
    this.register = function(user) {
      return $http.post('/register', user);
    };
    // this.isAuthenticated = function() {
    //   return $http.get('http://localhost:3000/api/authenticate');
    // };
  }]);