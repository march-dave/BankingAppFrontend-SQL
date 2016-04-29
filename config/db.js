'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'us-cdbr-azure-west-c.cloudapp.net',
  user     : 'b2d170b20e34e4',
  password : 'ae236d28',
  database : 'as_8acbd97353253a1'
  // host     : 'localhost',
  // user     : 'root',
  // password : '1234',
  // database : 'testdb'
});

mysql://b2d170b20e34e4:ae236d28@us-cdbr-azure-west-c.cloudapp.net/as_8acbd97353253a1


// Database=as_8acbd97353253a1;Data Source=us-cdbr-azure-west-c.cloudapp.net;
// User Id=b2d170b20e34e4;Password=ae236d28


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
