// backend/routes/authRoutes.js
const express = require('express');
const { signin, register, getCurrentUser } = require('./UserController');
const checkLogin = require('../../middlewares/checkToken');
const router = express.Router();


router.post('/login',signin);
router.post('/register',register);
router.get("/user", checkLogin, getCurrentUser);

module.exports = router;
