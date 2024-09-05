const express = require('express');
const { addToCartController } = require('../controllers/cartController');
const router = express.Router();

router.post('/addtocart', addToCartController);

module.exports = router;
