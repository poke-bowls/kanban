
"use strict";

angular.module('myApp')
.controller('CardController', ['$scope', 'CardService', function($scope, CardService){
  $scope.Cards = [];
  // $scope.CardService = CardService;
  CardService.getCards().success(function(data){
    console.log(data);
    $scope.Cards = data;
  });
}]);