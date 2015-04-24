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
    var quest = req.query.question ? req.query.question : req.body.question;
    findOneForum(req, res, function(forum) {
      var question = new Question({
        question: quest,
        forum_id: forum.id
      });
      question.save(function(err) {
        if(err) { throw err; }
        res.status(201).send();
      });
    });
  };

  var createForum = function(req, res) {
    var title = req.query.title ? req.query.title : req.body.title;
    var newRoute = "" + Math.floor(Date.now() % Math.random() * 100000);
    var forum = new Forum({
      title: title,
      url: newRoute
    });
    forum.save(function(err) {
      if(err) { throw err; }
      res.status(201).send({route: newRoute});
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