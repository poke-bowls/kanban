angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
.config(['$routeProvider', function($routeProvider){
  //config

  $routeProvider
    .when('/', {
      templateUrl : 'views/cards.html',
      controller : 'CardController'
    });
}])
.run(function(){
  //initialize
});