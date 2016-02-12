angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
.config(['$routeProvider', function($routeProvider){
  //config

  $routeProvider
    .when('/', {
      templateUrl : 'views/cards.html',
      controller : 'CardController'
    })
    .when('/login', {
      templateUrl : 'views/login.html',
      controller : 'UserController'
    })
    .when('/register', {
      templateUrl : 'views/register.html',
      controller : 'UserController'
    });
}])

.run(function(){
  //initialize
});