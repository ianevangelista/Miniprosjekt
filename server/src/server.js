const express = require("express");
const mysql = require("mysql");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const NewsDao = require("../../tests/newsdao");
const CategoryDao = require("../../tests/categorydao");
const CommentDao = require("../../tests/commentdao");

var port = process.env.PORT || 8000;
var pool = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.stud.iie.ntnu.no",
  user: "iaevange",
  password: "4eKUXpPO",
  database: "iaevange",
  debug: false
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

let newsDao = new NewsDao(pool);
let categoryDao = new CategoryDao(pool);
let commentDao = new CommentDao(pool);

require("./router")(app, pool, newsDao, categoryDao, commentDao);
app.listen(port, function() {
  console.log("info", "Server is running at port : " + 8000);
});

// TESTING - NEWS
/*
app.get("", (req, res) => {
  console.log(": fikk request fra klient");
  newsDao.getBreakingNews((status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
/*
app.get("/sak/:id", (req, res) => {
  console.log("/sak/:id: fikk request fra klient");
  newsDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
/*
app.post("/registrerSak", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  newsDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
/*
app.delete("/sak/:sak_id", (req, res) => {
  console.log("Fikk DELETE-request fra klient");
  newsDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
/*
app.put("/sak/:sak_id", (req, res) => {
  console.log("Fikk PUT-request fra klienten");
  newsDao.updateOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/

// TESTING - CATEGORY
/*
app.get("/kategori", (req, res) => {
  console.log(": fikk request fra klient");
  categoryDao.getAll((status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
/*
app.get("/kategori/:id", (req, res) => {
  console.log("/kategori/:id: fikk request fra klient");
  categoryDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/

// TESTING - COMMENTS
/*
app.get("/kommentar/:sak_id", (req, res) => {
  console.log("/sak/:sak_id: fikk request fra klient");
  commentDao.getOne(req.params.sak_id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
/*
app.post("/registrerKommentar", (req, res) => {
  console.log("Fikk POST-request fra klienten");
  commentDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
/*
app.delete("/kommentar/:kommentar_id", (req, res) => {
  console.log("Fikk DELETE-request fra klient");
  commentDao.deleteOne(req.params.kommentar_id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});*/
