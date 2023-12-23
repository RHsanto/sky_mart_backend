// backend/routes/productRoutes.js
const express = require('express');
const Product = require('./Product');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
