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
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const User = require('./db/users.js');

app.use(session(CONFIG.SESSION));

app.use(passport.initialize());

app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json({ extended : false }));
app.use(express.static('./public'));

passport.serializeUser(function(user, done){
  return done(null, user);
});

passport.deserializeUser(function(user, done){
  return done(null, user);
});


app.get('/api/cards', function (req, res){
    Cards.getAll()
      .then(function(cards){
        res.json(cards);
      });
});

app.post('/new', function (req, res) {
  var newCard = req.body;
  console.log("at server post new card", newCard);
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

function compare(password, data) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, data.password, function (err, res){
      resolve(res);
    });
  });
}

passport.use(new LocalStrategy({
  passReqToCallback: true
  },
  function(req, username, password, done) {
    var useName = req.body.username;
    User.findUser(useName)
    .then(function(user){
      if(!user){
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function(err, res){
        if(user.username === username && res === false){
          return done(null, false);
        }
        if(user.username === username && res === true){
          return done(null, user);
        }
      });
    });
}));


function userAuthentication(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.send(401);
  }
  return next();
}

app.get('/api/authenticate', function(req, res){
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/api/users', userAuthentication, function (req, res){
  User.getAll()
    .then(function(users){
      res.json(users);
    });
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

function hash(req) {
  return new Promise (function(resolve, reject) {
  bcrypt.genSalt(12, function(err, salt) {
    if(err) {
      reject(err);
    }
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      console.log(hash);
      resolve (hash);
    });
  });
  });
}

app.post('/register', function(req, res){
  hash(req)
  .then(function(hash) {
    var userObj = {
    username : req.body.username,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    password: hash,
    email : req.body.email
    };
    User.add(userObj)
    .then(function(user){
      console.log("Register then user", user);
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
});






app.post('/logout', function(req, res) {
  req.logout();
  res.send(200);
});

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});