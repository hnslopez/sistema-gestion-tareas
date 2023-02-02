var express = require('express');
const Task = require('../models/Task');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('a');
});

module.exports = router;