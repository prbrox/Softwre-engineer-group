const mysql = require('mysql');
require('dotenv').config();

//connect to the database
const connection = mysql.createConnection({
    host: process.env.REACT_APP_OLD_HOSTNAME,
    user: process.env.REACT_APP_OLD_USERNAME,
    password: process.env.REACT_APP_OLD_PASSWORD,
    database: process.env.REACT_APP_OLLD_DB
})

connection.connect();

module.exports = connection;