'use strict';

var db = require('../config/db');

// CREATE TABLE IF NOT EXISTS category (
//   id integer primary key auto_increment,
//   room text
// );
// INSERT INTO category (room) VALUES ('Kitchen');
// INSERT INTO category (room) VALUES ('Bedroom');
// INSERT INTO category (room) VALUES ('Livingroom');

db.query(`CREATE TABLE IF NOT EXISTS todos (
  id integer primary key AUTO_INCREMENT,
  createdAt DATETIME,
  dueDate DATETIME,
  desc2 TEXT,
  isComplete BOOLEAN DEFAULT false
)`);

exports.get = function(cb) {
  // db.query('SELECT * FROM todos', cb);
  db.query('SELECT * FROM todos', function(err, todo) {
    cb(err, todo);
  });
};

exports.getOneById = function(id, cb) {
  // db.query(`SELECT * FROM todos WHERE id = ${id}`, id, cb);
  db.query(`SELECT * FROM todos WHERE id = ${id}`, function(err, todo) {
    cb(err, todo);
  });
};

exports.removeById = function(id, cb) {
  db.query(`DELETE FROM todos WHERE id = ${id}`, id, cb);
};

exports.create = function(todo, cb) {
  // if(!todo.dueDate || !todo.desc) {
  //   return cb('Missing required field.')
  // }

  // var createdAt = moment().valueOf();
  // var dueDate = moment(todo.dueDate).valueOf();

  // `INSERT INTO todos (createdAt, dueDate, desc2) VALUES ('${todo.createdAt}', '${todo.dueDate}', '${todo.desc2}')`
  db.query(`INSERT INTO todos (createdAt, dueDate, desc2) VALUES ('${todo.createdAt}', '${todo.dueDate}', '${todo.desc2}')`,
    (err) => {
      if(err) return cb(err);

      db.query(`SELECT *
              FROM    todos
              WHERE   ID = (SELECT MAX(ID)  FROM todos);`, cb)
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
  this.getOneById(id, (err, todo) => {
    if(err) return cb(err);

    var newValue = todo.isComplete ? 0 : 1;

    db.query(`UPDATE todos SET isComplete = '${newValue}' WHERE id = '${id}'`, (err) => {
      if(err) return cb(err);
      cb(null, newValue);
    });
  });
};

// 'use strict';
//
// var db = require('../config/db');
// var moment = require('moment');
//
// db.run(`CREATE TABLE IF NOT EXISTS todos (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           createdAt DATETIME,
//           dueDate DATETIME,
//           desc TEXT,
//           isComplete BOOLEAN DEFAULT false
//         )`);
//
// exports.get = function(cb) {
//   db.all('SELECT * FROM todos', cb);
// };
//
// exports.getOneById = function(id, cb) {
//   db.get('SELECT * FROM todos WHERE id = ?', id, cb);
// };
//
// exports.removeById = function(id, cb) {
//   db.run('DELETE FROM todos WHERE id = ?', id, cb);
// };
//
// exports.create = function(todo, cb) {
//   if(!todo.dueDate || !todo.desc) {
//     return cb('Missing required field.')
//   }
//
//   var createdAt = moment().valueOf();
//   var dueDate = moment(todo.dueDate).valueOf();
//
//   db.run('INSERT INTO todos (createdAt, dueDate, desc) VALUES (?, ?, ?)', createdAt, dueDate, todo.desc,
//     (err) => {
//       if(err) return cb(err);
//
//       db.get(`SELECT *
//               FROM    todos
//               WHERE   ID = (SELECT MAX(ID)  FROM todos);`, cb)
//     });
// };
//
// exports.toggle = function(id, cb) {
//   this.getOneById(id, (err, todo) => {
//     if(err) return cb(err);
//
//     var newValue = todo.isComplete ? 0 : 1;
//
//     db.run("UPDATE todos SET isComplete = ? WHERE id = ?", newValue, id, (err) => {
//       if(err) return cb(err);
//       cb(null, newValue);
//     });
//   });
// };
