var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

var checkedLoggedIn=function($q, $timeout, $http, $location, $rootScope) {
  //initiate a new promise
  var deferred =$q.defer();

  //make an AJAX call to check if the user is logged in
  $http.get('/api/authenticate')
    .success(function(user) {
      // if Authenticated
      if(user !== '0') {
        deferred.resolve();

      //if not Authenticated
      } else if(user === '0') {
        $rootScope.message= 'You need to log in.';
        deferred.reject();
        $location.url('/login');
      }
    });
    return deferred.promise;
};

myApp
.config(['$routeProvider', function($routeProvider){
  //config

  $routeProvider
    .when('/', {
      templateUrl : 'views/cards.html',
      controller : 'CardController',
      resolve: {
        loggedin: checkedLoggedIn
      }
    })
    .when('/cards', {
      templateUrl : 'views/cards.html',
      controller : 'CardController',
      resolve: {
        loggedin: checkedLoggedIn
      }
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

.run(['$rootScope', '$localStorage', function($rootScope, $localStorage){
  if($localStorage.hasOwnProperty("creator_user")) {
    console.log($localStorage.creator_user);
  }
  //initialize
  ////must create something to set to !loggedin if they log out or after some period of time
  $rootScope.user_full_name = $localStorage.user_full_name  || '!loggedin';
  $rootScope.creator_user = $localStorage.creator_user || '!loggedin';
}]);