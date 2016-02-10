// (function(){
"use strict";

//   function CardService ( ) {
//     this.cards = [
//       {
//         id : 1,
//         title : 'Kanban Project',
//         priority : 'High',
//         createdBy : 'Brad Da Bishop',
//         assignedTo : 'B-rad',
//         status : "Done"
//       },
//       {
//         id : 2,
//         title : 'This Project',
//         priority : 'Low',
//         createdBy : 'Poopoopants',
//         assignedTo : 'Poop',
//         status : "Queue"
//       },
//       {
//         id : 3,
//         title : 'Another Project',
//         priority : 'Medium',
//         createdBy : 'The Colonel',
//         assignedTo : 'The Colonel',
//         status : "In Progress"
//       }
//     ];

//     this.getCards = function() {
//       return this.cards;
//     };


//     this.getCard = function(id) {
//       return this.cards.filter(function(card){
//         return card.id === id;
//       })
//       .reduce(function (__, card){
//         return card;
//       });
//     };

//     this.addCard = function(card){
//       var nextId = this.cards.length + 1;
//       this.cards.push({
//         id : nextId,
//         title : card.title,
//         priority : card.priority,
//         createdBy : card.createdBy,
//         assignedTo : card.assignedTo
//       });
//     };
//   }

//   angular.module('myApp')
//   .service('CardService', CardService);

// })();

//$http.GET(endpoints)

//.service('UserService', [$http, function($http){
  // this.getUsers = function(){
    // return $http.get(http://localhost:3000/api/users)
  // }
// }])

angular.module('myApp')
  .service('CardService', ['$http', function($http){
    this.getCards = function(){
      return $http.get('http://localhost:3000/api/cards');
    };
    this.addCard = function(){

    };
  }]);