'use strict';

var express = require('express');
var router = express.Router();

// router.use('/todos', require('./todos'));
router.use('/banks', require('./banks'));

module.exports = router;
