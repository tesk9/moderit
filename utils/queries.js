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

  var addQuestion = function(req, res) {
    findOneForum(req, res, function(forum) {
      var question = new Question({
        question: req.query.question,
        forum_id: forum.id
      });
      question.save(function(err) {
        if(err) { throw err; }
        res.status(201).send();
      });
    });
  };

  var createForum = function(req, res) {
    var newRoute = "" + Math.floor(Math.random() * 100) + Date.now();
    var forum = new Forum({
      title: req.query.name,
      url: newRoute
    });
    forum.save(function(err) {
      if(err) { throw err; }
      res.status(201).send();
    });
  }

  return {
    findOneForum: findOneForum,
    getQuestionsByForum: getQuestionsByForum,
    addQuestion: addQuestion,
    createForum: createForum
  };
})()

module.exports = db;