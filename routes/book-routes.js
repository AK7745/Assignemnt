const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book-controller.js');
const { validateBook } = require('../utils/validation.js');

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', validateBook, bookController.addBook);
router.put('/books/:id', validateBook, bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
