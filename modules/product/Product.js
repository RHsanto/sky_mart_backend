// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  variations: {
    color: String,
    size: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
