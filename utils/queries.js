var Forum = require('../forums/forumSchema.js');
var Question = require('../questions/QuestionSchema.js');

var db = (function() {
  var findOneForum = function(req, res, callback) {
    Forum.findOne({url: req.params.url}).exec(function(err, forum) {
      if(err) {
        throw err;
      }
      if(forum) {
        callback ? callback(forum) : res.json(forum);
      } else {
        res.status(404).send();
      } 
    });
  };
  
  var getQuestionsByForum = function(req, res) {
    findOneForum(req, res, function(forum) {
      Question.find({forum_id: forum.id}).exec(function(err, questions) {
        if(err) {
          throw err;
        }
        res.json(questions);
      });
    });
  };

  return {
    findOneForum: findOneForum,
    getQuestionsByForum: getQuestionsByForum
  };
})()

module.exports = db;