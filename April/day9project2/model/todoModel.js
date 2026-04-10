
const mongoose = require('mongoose')

let todoschema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  noOfLikes: Number,
});

const todoModel = mongoose.model("todos", todoschema);

module.exports = {todoModel}
