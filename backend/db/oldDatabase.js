require("dotenv").config();
const mysql = require("mysql");

const asyncHandler = require("../api/errorHandler");

const pool = mysql.createPool({
  host: process.env.REACT_APP_OLD_HOSTNAME,
  user: process.env.REACT_APP_OLD_USERNAME,
  password: process.env.REACT_APP_OLD_PASSWORD,
  database: process.env.REACT_APP_OLLD_DB,
});

pool.getConnection((err, connection) => {
  if (err) console.log(err);
  console.log("successfully connected");
  connection.release();
});

module.exports = pool;
