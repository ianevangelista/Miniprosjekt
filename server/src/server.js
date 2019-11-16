const express = require("express");
const mysql = require("mysql");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const NewsDao = require("newsdao.js");

var port = process.env.PORT || 8000;
var pool = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.stud.iie.ntnu.no",
  user: "iaevange",
  password: "4eKUXpPO",
  database: "iaevange",
  debug: false
});

// TESTING
let newsDao = new NewsDao(pool);
app.get("", (req, res) => {
  console.log(": fikk request fra klient");
  newsDao.getAll((status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.get("/sak/:id", (req, res) => {
  console.log("/sak/:id: fikk request fra klient");
  newsDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.post("/registrerSak", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  newsDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.delete("/sak/:sak_id", (req, res) => {
  console.log("Fikk DELETE-request fra klient");
  newsDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.put("/sak/:sak_id", (req, res) => {
  console.log("Fikk PUT-request fra klienten");
  newsDao.updateOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  next();
});

var htmlPath = __dirname + "/build";
app.use(express.static(htmlPath));

require("./router")(app, pool);
app.listen(port, function() {
  console.log("info", "Server is running at port : " + 8000);
});
