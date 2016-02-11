"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Cards = require('./db/cards.js');
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.use(bodyParser.json({ extended : false }));

app.get('/api/cards', function (req, res){
    Cards.getAll()
      .then(function(cards){
        res.json(cards);
      });
});

app.post('/new', function (req, res) {
  var newCard = req.body;
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

app.delete('/delete/:id', function (req, res) {
  Cards.deleteCard(req.params.id)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err){
      console.log(err);
    });
});

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});