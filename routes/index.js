var express = require('express');
var router = express.Router();
var db = require('../utils/queries.js');
var postHandler = require('../utils/postHandler.js')();

var getQuestions = function(req, res, url) {
  db.getQuestionsByForum(url, function(questions) {
    res.json(questions);
  }, function() {
    res.status(404).send("Forum not found.");
  });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moderit' });
});

router.get('/forum/:url', function(req, res, next) {
  db.findOneForum(req.params.url, function(forum) {
    res.json(forum);
  }, res.status(404).send);
});

router.post('/forum', function(req, res, next) {
  postHandler(req, res, function() {
    var title = req.query.title ? req.query.title : req.body.title;
    db.createForum(title, function(route) {
      res.status(201).send({route: route});
    });
  });
});

router.get('/forum/:url/question', function(req, res, next) {
  getQuestions(req, res, req.params.url);
});

router.post('/forum/:url/question', function(req, res, next) {
  postHandler(req, res, function() {
    var quest = req.query.question ? req.query.question : req.body.question;
    db.addQuestion(quest, function() {
      res.status(201).send();
    });
  });
});

router.get('/:url', function(req, res, next) {
  getQuestions(req, res, req.params.url);
});

module.exports = router;
