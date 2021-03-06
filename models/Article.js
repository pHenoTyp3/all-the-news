const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  }
});


const article = mongoose.model("Article", ArticleSchema);


module.exports = article;
