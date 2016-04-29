'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'testdb'
});

connection.connect();

module.exports = connection;


// 'use strict';
//
// var sqlite3 = require('sqlite3').verbose();
// var path = require('path');
//
// var dbPath = path.join(__dirname, '../data/todos.db');
//
// var db = new sqlite3.Database(dbPath);
//
// module.exports = db;
