var express = require('express');
var router = express.Router();

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
    res.status(200).send({id: newRoute});
  });
});

router.get('/:id', function(req, res, next) {
  res.send(req.params.id);
});


module.exports = router;
