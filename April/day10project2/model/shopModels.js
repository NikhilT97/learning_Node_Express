//shopModels.js
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: String,
  inStock: {
    type: Boolean,
    default: true,
  },
});

//make model
const Product = mongoose.model("Product", productSchema);


module.exports = Product