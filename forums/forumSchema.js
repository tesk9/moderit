var mongoose = require('mongoose');

var ForumSchema = new mongoose.Schema({
  title: String,
  url: String
});

module.exports = mongoose.model('Forum', ForumSchema);