
"use strict";

angular.module('myApp')
  .service('CardService', ['$http', function($http){
    this.getCards = function(){
      return $http.get('http://localhost:3000/api/cards');
    };
    this.getCard = function(){

    };
    this.addCard = function(card){
      return $http.post('/new', card);
      // .then(function(data) {
      // console.log( 'Hooowwwdy',data);
      // });
    };
    this.editCard = function(card){
      return $http.put('/edit', card);
    };

    this.deleteCard = function(card) {
      return $http.delete('/delete/' + card._id);

    };
  }]);