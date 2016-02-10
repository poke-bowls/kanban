"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

//add sequelize

app.use(express.static('./public'));

app.use(bodyParser.json());

    var cards = [
      {
        id : 1,
        title : 'Kanban Project',
        priority : 'High',
        createdBy : 'Brad Da Bishop',
        assignedTo : 'B-rad',
        status : "Done"
      },
      {
        id : 2,
        title : 'This Project',
        priority : 'Low',
        createdBy : 'Poopoopants',
        assignedTo : 'Poop',
        status : "Queue"
      },
      {
        id : 3,
        title : 'Another Project',
        priority : 'Medium',
        createdBy : 'The Colonel',
        assignedTo : 'The Colonel',
        status : "In Progress"
      }
    ];

app.get('/api/cards', function (req, res){
    // Cards.all()
    //   .then(function(users){
     res.json(cards);
      // });
});

app.post('/new', function (req, res) {
  var block = req.body
  cards.push(block);
  res.json(block);

});

// cards is an array of objects

// app.get('*', function (req, res){
//   res.sendFile('/public/index.html', { root : __dirname });
// });

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});