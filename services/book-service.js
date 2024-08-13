const Book = require('../models/book-model');

exports.getAllBooks = async () => {
  return await Book.find();
};

exports.getBookById = async (id) => {
  return await Book.findById(id);
};

exports.addBook = async (data) => {
  const book = new Book(data);
  return await book.save();
};

exports.updateBook = async (id, data) => {
  return await Book.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

