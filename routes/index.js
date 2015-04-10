var express = require('express');
var router = express.Router();
var db = require('../utils/queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moderit' });
});

router.post('/', function(req, res, next) {
  var data = "";
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", function() {
    var newRoute = "" + Math.floor(Math.random() * 100) + Date.now();
    res.status(200).send({url: newRoute});
  });
});

router.get('/forum/:url', function(req, res, next) {
  db.findOneForum(req, res);
});

router.post('/forum', function(req, res, next) {
  res.send("This page is still being built");
});

router.get('/forum/:url/question', function(req, res, next) {
  res.send("This page is still being built");
});

router.post('/forum/:url/question', function(req, res, next) {
  db.addQuestion(req, res, req.query.question);
});

router.get('/:url', function(req, res, next) {
  db.getQuestionsByForum(req, res);
});

module.exports = router;
