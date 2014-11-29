var express = require('express');
var router = express.Router();

/* GET home page. */
//console.log('Loading router: ' + router);

router.get('/', function(req, res) {
  res.json({ title: 'Fake server' });
});

module.exports = router;

