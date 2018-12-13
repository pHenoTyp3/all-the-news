const request = require('request');
const db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = (app)=>{

  

app.get("/scraped", (req, res)=> {

  db.Article
    .find({})
    .then((dbArticle)=> {

      res.render("scraped",{article: dbArticle});
    })
    .catch((err)=> {

      res.json(err);
    });
});


app.get("/scraper", (req, res)=> {

  axios.get("http://gizmodo.com").then((response)=> {

    const $ = cheerio.load(response.data);


    $("article h1").each((i, element)=> {

      let result = {};


      let title = $(this).children("a").text();
      let link = $(this).children("a").attr("href");
      db.Article
        .deleteMany({})
        .then(()=>{
   
        db.Article
          .create({
            title: title,
            link: link
          })
          .then((result)=> {
            console.log(result);
            res.redirect('/scrape');
          })
          .catch((err)=> {
     
            res.json(`error occurred ${err}`);
          });
      });
    });
  });
});


app.get("/saved", (req, res)=> {

  db.Saved
    .find({})
    .then((dbArticle)=> {

      res.render("saved",{article: dbArticle});
    })
    .catch((err)=> {

      res.json(err);
    });
});

app.post("/save/:id", (req, res)=> {
  const _id = req.params.id;

  console.log(_id);
  db.Article
    .find({ _id })
    .then((data)=>{
      db.Saved
       .create(data)
       .then((_data)=>{
         console.log(_data);
         res.json(_data);
    }).then(()=>{
      db.Article
        .delete({ _id })
        .then((result)=>{
          console.log(result);

        }).catch((err)=> {
        res.json(err);
      });
    });
  });
});

 };