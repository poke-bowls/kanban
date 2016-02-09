(function(){
"use strict";

  function CardService ( ) {
    this.cards = [
      {
        id : 1,
        title : 'Kanban Project',
        priority : 'High',
        createdBy : 'Brad Da Bishop',
        assignedTo : 'B-rad',
        status : 0
      },
      {
        id : 2,
        title : 'This Project',
        priority : 'Low',
        createdBy : 'Poopoopants',
        assignedTo : 'Poop',
        status : 1
      },
      {
        id : 3,
        title : 'Another Project',
        priority : 'Medium',
        createdBy : 'The Colonel',
        assignedTo : 'The Colonel',
        status : 2
      }
    ];

    this.getCards = function() {
      return this.cards;
    };

    this.getCard = function(id) {
      return this.cards.filter(function(card){
        return card.id === id;
      })
      .reduce(function (__, card){
        return card;
      });
    };

    this.addCard = function(card){
      var nextId = this.cards.length + 1;
      this.cards.push({
        id : nextId,
        title : card.title,
        priority : card.priority,
        createdBy : card.createdBy,
        assignedTo : card.assignedTo
      });
    };
  }

  angular.module('myApp').service('CardService', CardService);

})();