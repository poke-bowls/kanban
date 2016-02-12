module.exports = (function () {
  var db = require('./mongoose.js');
  var mongoose = require('mongoose');
  var userSchema = mongoose.Schema({
    username : String,
    first_name : String,
    last_name : String,
    password: String,
    email : String
  });

  var User = mongoose.model('User', userSchema);

  function _add(userObject) {
    console.log('NewUser', userObject);

    return new User(userObject).save();
  }

  function _deleteUser(requestId) {
    return User.find({_id: requestId}).remove().exec();
  }

  function _findUser(user) {
    return User.findOne({
      "username" : user.username
    });
  }

  return {
    add: _add,
    delete: _deleteUser,
    findUser: _findUser
  };
})();