const bookService = require('../services/book-service');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { result, socketIds } = await bookService.addBook(req.body);
    if (socketIds) {
      socketIds.forEach(socketId => {
        req.io.to(socketId).emit('bookAdded', result);
      });
    }
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { book, socketIds } = await bookService.updateBook(req.params.id, req.body);
    if (socketIds) {
      socketIds.forEach(socketId => {
        req.io.to(socketId).emit('bookAdded', result);
      });
    }
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    req.io.emit('bookDeleted', book);  
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

