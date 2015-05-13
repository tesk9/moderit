var Forum = require('../forums/forumSchema.js');
var Question = require('../questions/QuestionSchema.js');

var db = (function() {
  var findOneForum = function(url, successCallback, failureCallback) {
    Forum.findOne({url: url}).exec(function(err, forum) {
      if(err) {
        throw err;
      }
      if(forum) {
        successCallback(forum);
      } else {
        failureCallback();
      } 
    });
  };
  
  var getQuestionsByForum = function(url, successCallback, failureCallback) {
    findOneForum(url, function(forum) {
      Question.find({forum_id: forum.id}).exec(function(err, questions) {
        if(err) {
          throw err;
        }
        successCallback(questions)
      });
    }, failureCallback);
  };

  var addQuestion = function(quest, callback) {
    findOneForum(req, res, function(forum) {
      var question = new Question({
        question: quest,
        forum_id: forum.id
      });
      question.save(function(err) {
        if(err) { throw err; }
        callback();
      });
    });
  };

  var createForum = function(title, callback) {
    var newRoute = "" + Math.floor(Date.now() % Math.random() * 100000);
    findOneForum(newRoute, function() {
      // If a forum exists at this route, create a new route
      createForum(title, callback);
    }, function() {
      var forum = new Forum({
        title: title,
        url: newRoute
      });
      forum.save(function(err) {
        if(err) { throw err; }
        callback(newRoute);
      });
    })
  };

  return {
    findOneForum: findOneForum,
    getQuestionsByForum: getQuestionsByForum,
    addQuestion: addQuestion,
    createForum: createForum
  };
})()

module.exports = db;