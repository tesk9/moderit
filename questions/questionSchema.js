var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  question: String,
  forum_id: String
});

module.exports = mongoose.model('Question', QuestionSchema);