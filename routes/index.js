var express = require('express');
var router = express.Router();
var db = require('../utils/queries.js');
var postHandler = require('../utils/postHandler.js')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moderit' });
});

router.get('/forum/:url', function(req, res, next) {
  db.findOneForum(req, res);
});

router.post('/forum', function(req, res, next) {
  postHandler(req, res, db.createForum);
});

router.get('/forum/:url/question', function(req, res, next) {
  db.getQuestionsByForum(req, res);
});

router.post('/forum/:url/question', function(req, res, next) {
  postHandler(req, res, db.addQuestion);
});

router.get('/:url', function(req, res, next) {
  db.getQuestionsByForum(req, res);
});

module.exports = router;
