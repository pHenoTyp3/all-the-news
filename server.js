const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 3000;


const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));

const expHbs = require('express-handlebars');
app.engine('handlebars', expHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/heroku_npcds4t8";
mongoose.Promise = Promise;
mongoose.connect( MONGODB_URI, {
  useMongoClient: true
});



app.listen(PORT, ()=> {
  console.log(`App running on port ${PORT}!`);
});
   