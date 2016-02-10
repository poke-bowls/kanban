
"use strict";

angular.module('myApp')
.controller('CardController', ['$scope', 'CardService', function($scope, CardService){
  $scope.Cards = [];
  $scope.CardService = CardService;
  CardService.getCards().success(function(data){
    // console.log(data);
    $scope.Cards = data;
  });
  $scope.clickButton=function(card) {
    CardService.addCard(card).then(function(data) {
      $scope.Cards.push(data.data);
    });
  };
  $scope.submitEdit = function(card) {
    CardService.editCard(card).then(function(data){
      CardService.getCards().success(function(data){
        $scope.Cards = data;
      });
    });
  };
}]);