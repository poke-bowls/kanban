"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Cards = require('./db/cards.js');
const PORT = process.env.PORT || 3000;

//authentication
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('./config/session-config');

const User = require('./db/users.js');

app.use(session(CONFIG.SESSION));

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser(function(user, done){
  return done(null, user);
});

passport.deserializeUser(function(user, done){
  return done(null, user);
});

passport.use(new LocalStrategy({
  passReqToCallback: true
  },
  function(req, username, password, done){
    User.findUser({
      "username": username
    })
    .then(function(user){
      console.log('Hi', user);
      if(!user){
        return done(null, false);
      }
      return done(null, user);
    });
}));

app.use(express.static('./public'));

app.use(bodyParser.json({ extended : false }));

app.get('/api/cards', function (req, res){
    console.log('Test', req.user);
    Cards.getAll()
      .then(function(cards){
        res.json(cards);
      });
});

app.get('/api/users', function (req, res){
  Users.getAll()
    .then(function(users){
      res.json(users);
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

app.get('/login', function(req, res) {
});

app.post('/login', passport.authenticate('local', {
  succesRedirect : '/',
  failureRedirect : '/login'
}));

function isAuthenticated(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/gallery/login');
  }
  return next();
}

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});