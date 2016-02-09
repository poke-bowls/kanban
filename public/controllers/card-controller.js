
"use strict";

angular.module('myApp')
.controller('CardController', ['$scope', 'CardService', function($scope, CardService){
  $scope.CardService = CardService;
  $scope.myModel = "Input Here";
}]);