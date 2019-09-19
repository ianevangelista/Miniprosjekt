const express = require("express");
const mysql = require("mysql");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "iaevange",
    password: "4eKUXpPO",
    database: "iaevange",
    debug: false
   });
require('./router')(app, pool);
app.listen(port);