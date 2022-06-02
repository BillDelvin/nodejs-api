const mysql = require("mysql2");

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "kampus_merdeka",
  password: "bill1234",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = conn;
