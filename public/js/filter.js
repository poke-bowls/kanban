"use strict";
//custom filter
angular.module('myApp')
.filter('statusCheckingFilter', function() {
  console.log('Hereee?');
  return function(cards,status) {
    return cards.filter(function(card){
      return card.status===status;
    });
  };
});