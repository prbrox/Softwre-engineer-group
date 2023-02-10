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
app.post("/edit-controls", (req, res) => { Update(res, req.body.record); })
app.post("/remove-controls", (req, res) => { Delete(res, req.body.record); })
app.post("/add-controls", (req, res) => { Create(res, req.body.record); })


var PORT = (Number(process.env.PORT) + 1) || 3050;
app.listen(PORT, () => {
    console.log(`the server started on Port : ${PORT}`)
})