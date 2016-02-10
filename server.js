"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Cards = require('./db/cards.js');
const PORT = process.env.PORT || 3000;

//add sequelize to talk to database! Postgres, SQL

app.use(express.static('./public'));

app.use(bodyParser.json());

app.use(methodOverride(function ( req, res ){
  var method = req.body._method;
  delete req.body._method;
  return method;
}));


app.get('/api/cards', function (req, res){
    Cards.getAll()
      .then(function(cards){
        res.json(cards);
      });
});

app.post('/new', function (req, res) {
  var newCard = req.body;
  // cards.push(block);
  Cards.add(newCard)
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

app.put('/edit', function (req, res){
  Cards.editById(req.body, req.body._id)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

// app.get('*', function (req, res){
//   res.sendFile('/public/index.html', { root : __dirname });
// });

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});