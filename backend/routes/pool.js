var mysql = require("mysql");
var pool = mysql.createPool({
  port: 3306,
  user: "root",
  host: "localhost",
  password: "12345",
  database: "roombooking",
});

module.exports = pool;
