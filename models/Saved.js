const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  }

});


const Saved = mongoose.model("Saved", SavedSchema);


module.exports = Saved;