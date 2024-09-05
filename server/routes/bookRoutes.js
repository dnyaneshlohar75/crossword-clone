const express = require('express');
const { addbookController,removeBookController, getBooksByCategoryController,  getBookById, getAllBooks } = require('../controllers/bookController');

const router = express.Router();

router.post('/addbook', addbookController);

router.get('/category/:category', getBooksByCategoryController);

router.get('/allbook',  getAllBooks);

router.get('/:id', getBookById);

router.delete('/removebook', removeBookController);

module.exports = router;
