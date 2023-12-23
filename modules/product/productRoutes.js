// backend/routes/productRoutes.js
const express = require('express');
const { getProducts, singleProduct } = require('./ProductController');
const router = express.Router();


// Here Products Route
router.get("/products", getProducts);
router.get("/product/:id", singleProduct);



module.exports = router;
