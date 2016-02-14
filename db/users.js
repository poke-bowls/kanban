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

  function _getAll() {
    return User.find();
  }

  function _deleteUser(requestId) {
    return User.find({_id: requestId}).remove().exec();
  }

  function _findUser(useName) {
    return User.findOne({
      "username" : useName
    });
  }

  return {
    add: _add,
    getAll: _getAll,
    delete: _deleteUser,
    findUser: _findUser
  };
})();