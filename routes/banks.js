'use strict';

var express = require('express');
var router = express.Router();

// var Bank = require('../models/todo');
var Bank = require('../models/bank');

//   /api/todo
router.route('/')
  .get((req, res) => {

    Bank.get((err, banks) => {
      if(err) {
        return res.status(400).send(err);
      }

      res.send(banks); // banks --> res.data
    });
  })
  .post((req, res) => {
    // req.body  -->  { desc: ??, dueDate: ?? }
    Bank.create(req.body, (err, newBank) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(newBank);
    });
  });

router.put('/:id/toggle', (req, res) => {
  Bank.toggle(req.params.id, (err, newValue) => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send({newValue: newValue});
  });
});

router.delete('/:id', (req, res) => {
  Bank.removeById(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;
