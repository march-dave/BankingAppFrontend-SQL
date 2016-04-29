'use strict';

var db = require('../config/db');

// CREATE TABLE IF NOT EXISTS category (
//   id integer primary key auto_increment,
//   room text
// );
// INSERT INTO category (room) VALUES ('Kitchen');
// INSERT INTO category (room) VALUES ('Bedroom');
// INSERT INTO category (room) VALUES ('Livingroom');

// db.query(`CREATE TABLE IF NOT EXISTS todos (
//   id integer primary key AUTO_INCREMENT,
//   createdAt DATETIME,
//   dueDate DATETIME,
//   desc2 TEXT,
//   isComplete BOOLEAN DEFAULT false
// )`);

// INSERT INTO banks (date, desc2, debits, credits, isComplete) VALUES ('2001-01-01', 'Kat is not Cat', 10, 20, false);

// date DATETIME DEFAULT CURRENT_TIMESTAMP,
db.query(`CREATE TABLE IF NOT EXISTS banks (
  id integer primary key AUTO_INCREMENT,
  date DATETIME,
  desc2 TEXT,
  debits int,
  credits int,
  isComplete BOOLEAN DEFAULT false
)`);


exports.get = function(cb) {
  // db.query('SELECT * FROM todos', cb);
  // db.query('SELECT * FROM todos', function(err, todo) {
  db.query('SELECT * FROM banks', function(err, bank) {
    cb(err, bank);
  });
};

exports.getOneById = function(id, cb) {
  // db.query(`SELECT * FROM todos WHERE id = ${id}`, id, cb);
  db.query(`SELECT * FROM banks WHERE id = ${id}`, function(err, todo) {
    cb(err, bank);
  });
};

exports.removeById = function(id, cb) {
  db.query(`DELETE FROM banks WHERE id = ${id}`, id, cb);
};

exports.create = function(bank, cb) {
  // if(!todo.dueDate || !todo.desc) {
  //   return cb('Missing required field.')
  // }

  // var createdAt = moment().valueOf();
  // var dueDate = moment(todo.dueDate).valueOf();

  // `INSERT INTO todos (createdAt, dueDate, desc2) VALUES ('${todo.createdAt}', '${todo.dueDate}', '${todo.desc2}')`
  // db.query(`INSERT INTO banks (desc2) VALUES ('${bank.desc2}')`,
  db.query(`INSERT INTO banks (desc2, debits, credits) VALUES ('${bank.desc2}', '${bank.debits}', '${bank.credits}')`,
  // db.query(`INSERT INTO banks (desc2, debits, credits) VALUES ('${bank.desc2}', '${bank.debits}', '${bank.credits}')`,
    (err) => {
      if(err) return cb(err);

      db.query(`SELECT *
              FROM    banks
              WHERE   ID = (SELECT MAX(ID)  FROM banks);`, cb)
    });
  };


// exports.create = function(grade, cb) {
//   db.query(`INSERT INTO description (descript, val, categoryid) VALUES ('${grade.make}', '${grade.model}', '${grade.serialnumber}')`,
//     (err) => {
//       if(err) return cb(err);
//       db.query('SELECT * FROM description WHERE ID = (SELECT MAX(ID) FROM description);', cb)
//     });
// };


exports.toggle = function(id, cb) {
  this.getOneById(id, (err, bank) => {
    if(err) return cb(err);

    var newValue = bank.isComplete ? 0 : 1;

    db.query(`UPDATE banks SET isComplete = '${newValue}' WHERE id = '${id}'`, (err) => {
      if(err) return cb(err);
      cb(null, newValue);
    });
  });
};
