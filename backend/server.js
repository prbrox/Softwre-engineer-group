const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('./db/oldDatabase');
const API = require('./api/API');

const { Create, Read, Update, Delete } = API;

app.use(cors({
    origin: "*"
}))


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("_return-supervisor-list", (req, res) => Read(res));
app.get("/read-from-report", (req, res) => ReadReports(res));
app.post("/write-report", (req, res) => WriteReport(req.body.report, res));
app.post("/create-supervisors", (req, res) => Create(req.body.name, res));
app.post("/check-passwords", (req, res) => CheckPass(req.body.password, res));


app.get("/get-controls", (req, res) => { Read(res); })
app.post("/edit-controls", (req, res) => { Update(res, req.body.record); })
app.post("/remove-controls", (req, res) => { Delete(res, req.body.record); })
app.post("/add-controls", (req, res) => { Create(res, req.body.record); })


var PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`the server started on Port : ${PORT}`)

})