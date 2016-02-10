module.exports = (function () {

var db = require('./mongoose.js');
var mongoose = require('mongoose');
var cardSchema = mongoose.Schema({
  title : String,
  priority : String,
  createdBy: String,
  assignedTo: String,
  status: String
});

var Card = mongoose.model('Card', cardSchema);

  function _add(cardObject) {
    console.log('here', cardObject);

    return new Card(cardObject).save();
  }

  function _getAll() {
    return Card.find();
  }

  function _editById(requestBody, requestId){
    return Card.findOneAndUpdate({_id : requestId},
      {
        $set:requestBody
      },
      {
        new: true
      });
    }

  function _getById(requestId){
    return Card.find({_id: requestId
    });
  }

  function _deleteCard(requestId) {
    return Card.find({_id: requestId }).remove().exec();
  }

//all the methods we are exposing/exporting on our cardModule
  return {
    add: _add,
    getAll: _getAll,
    getById: _getById,
    editById: _editById,
    deleteCard: _deleteCard
  };
})();