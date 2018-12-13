const path = require("path");

module.exports = (app)=> {


  app.get("/", (req, res)=> {
    res.render('index');
  });
  app.get("/scrape", (req, res)=> {
    res.render('scrape');
  });
  app.get("/scraped", (req, res)=> {
    res.render('scraped');
  });
  app.get("/saved", (req, res)=> {
    res.render('saved');
  });
};