const mongoose = require('mongoose')

//make schema
const movieSchema = mongoose.Schema({
  title: String,
  description: String,
  releaseYear: Number,
  onNetflix: Boolean,
});

//make model

const movieModel = new mongoose.model("moviesDB", movieSchema);

module.exports = {movieModel}