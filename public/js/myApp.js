angular.module('myApp', []);

var myApp = angular.module('myApp', ['ngRoute']);

myApp
.config(['$routeProvider', function($routeProvider){
  //config
  $routeProvider
    .when('/', {
      templateUrl : 'views/cards.html',
      controller : 'CardController'
    });
}])
.run([function(){
  //initialize
}]);