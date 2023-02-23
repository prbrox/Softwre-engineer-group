
require('dotenv').config();
const asyncHandler = require("../api/errorHandler")
//connect to the database

var config ={
  host: process.env.REACT_APP_OLD_HOSTNAME,
  user: process.env.REACT_APP_OLD_USERNAME,
  password: process.env.REACT_APP_OLD_PASSWORD,
  database: process.env.REACT_APP_OLLD_DB
}


//conosole.log(connection)

// const connection = mysql.createConnection({
//     host: process.env.REACT_APP_OLD_HOSTNAME,
//     user: process.env.REACT_APP_OLD_USERNAME,
//     password: process.env.REACT_APP_OLD_PASSWORD,
//     database: process.env.REACT_APP_OLLD_DB
// })


module.exports =config;

