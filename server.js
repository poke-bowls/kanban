"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Cards = require('./db/cards.js');
const PORT = process.env.PORT || 3000;

//add sequelize to talk to database! Postgres, SQL

app.use(express.static('./public'));

app.use(bodyParser.json({ extended : false }));

// app.use(methodOverride(function ( req, res ){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     var method = req.body._method;
//     delete req.body._method;
//     return method;
//   }

  // console.log("at method method-override", req);
  // var method = req.body._method;
  // delete req.body._method;
  // return method;
// }));


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

app.delete('/delete/:id', function (req, res) {
  Cards.deleteCard(req.params.id)
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