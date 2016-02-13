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



app.use(express.static('./public'));

app.use(bodyParser.json({ extended : false }));

app.get('/api/cards', function (req, res){
    console.log('Test', req.user);
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

passport.use(new LocalStrategy({
  passReqToCallback: true
  },
  function(req, username, password, done){
    var useName = req.body.username;
    var passW = req.body.password;
    User.findUser(useName, password)
    .then(function(user){
      if(!user){
        return done(null, false);
      }
      return done(null, user);
    });
}));

function userAuthentication(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.send(401);
  }
  return next();
}

app.get('/api/authenticate', function(req, res){
  console.log('Im at authenticate route on server');
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/api/users', userAuthentication, function (req, res){
  Users.getAll()
    .then(function(users){
      res.json(users);
    });
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

app.post('/register', function(req, res){
  User.add(req.user)
    .then(function(user){
      console.log(user);
      req.login(user, function(err) {
        if(err) {
          return next(err);
        }
        return res.json({
          success : true
        });
      });
    });
});

app.post('/logout', function(req, res) {
  req.logout();
  res.send(200);
});

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});