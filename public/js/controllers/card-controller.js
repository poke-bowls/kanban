
"use strict";

angular.module('myApp')
.controller('CardController', ['$scope', 'CardService', function($scope, CardService){
  $scope.Cards = [];
  $scope.CardService = CardService;
  CardService.getCards().success(function(data){
    $scope.Cards = data;
  });

  $scope.postButton=function(card) {
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
  $scope.delCard = function(card) {
    CardService.deleteCard(card).then(function(data) {
      CardService.getCards().success(function(data){
        $scope.Cards = data;
      });
    });
  };
  $scope.rightButton = function(card) {
    if(card.status === 2) {
      card.status=2;
    } else {
      card.status = card.status + 1;
    }
    CardService.editCard(card).then(function(data){
      CardService.getCards().success(function(data){
        $scope.Cards = data;
      });
    });
  };
  $scope.leftButton = function(card) {
    if(card.status === 0) {
      card.status=0;
    } else {
      card.status = card.status - 1;
    }
    CardService.editCard(card).then(function(data){
      CardService.getCards().success(function(data){
        $scope.Cards = data;
      });
    });
  };

}]);