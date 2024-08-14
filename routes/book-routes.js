const express = require('express');
const router = express.Router();
const { addBook, deleteBook, getAllBooks, getBookById, updateBook } = require('../controllers/book-controller.js');
const {validation, updatebookSchema, createbookSchema } = require('../utils/validation.js');

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', validation(createbookSchema), addBook);
router.put('/books/:id', validation(updatebookSchema), updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;
