'use strict';

var express = require('express');
var router = express.Router();

// var moment = require('moment');
// var Bank = require('../models/todo');
var Bank = require('../models/bank');

//  GET /
router.get('/', (req, res) => {
  Bank.get((err, banks) => {
    if(err) {
      res.render('error', {error: err})
    } else {

      banks = banks.map(bank => {
        // todo.dueDate = moment(todo.dueDate, 'X').format('l');
        // todo.createdAt = moment(todo.createdAt, 'X').format('l');
        return bank;
      })

      res.render('home', {banks: banks});
    }
  })
})

module.exports = router;
