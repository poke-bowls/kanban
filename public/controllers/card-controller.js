
"use strict";

angular.module('myApp')
.controller('CardController', ['$scope', 'CardService', function($scope, CardService){
  $scope.CardService = CardService;
  // $scope.StatusCheck = CardService.getCard(CardService.status);
  // console.log($scope.StatusCheck);
  //$scope.myModel = "Input Here";
}]);