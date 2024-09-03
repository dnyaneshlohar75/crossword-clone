const express = require('express');
const { addbookController, getProductsByCategoryController } = require('../controllers/bookController');

const router = express.Router();

router.post('/addbook', addbookController);

router.get('/category/:category', getProductsByCategoryController);

module.exports = router;
