const express = require("express");
const mysql = require("mysql");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const NewsDao = require("./dao/newsdao");
const CategoryDao = require("./dao/categorydao");
const CommentDao = require("./dao/commentdao");
require("dotenv").config();
var port = process.env.PORT || 8000;
app.use(express.static("public"));
var pool = mysql.createPool({
  connectionLimit: 2,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  debug: false
});

let newsDao = new NewsDao(pool);
let categoryDao = new CategoryDao(pool);
let commentDao = new CommentDao(pool);

require("./router")(app, pool, newsDao, categoryDao, commentDao);
app.listen(port, function() {
  console.log("info", "Server is running at port : " + port);
});
