const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('./db/oldDatabase');
const crud = require('./api/crud');

const { Create, Read, Update, Delete } = crud;

app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get-controls", (req, res) => { Read(res); })
var PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`the server started on Port : ${PORT}`)
})