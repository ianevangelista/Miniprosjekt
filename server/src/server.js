const express = require("express");
const mysql = require("mysql");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const NewsDao = require("../dao/newsdao");
const CategoryDao = require("../dao/categorydao");
const CommentDao = require("../dao/commentdao");

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
