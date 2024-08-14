const Book = require('../models/book-model');
const { userSockets } = require('../sockets/sockets');
const { getAllGenreSubscribers, checkAllUserIdsExistInSockets } = require('./user-service');

exports.getAllBooks = async () => {
  return await Book.find();
};

exports.getBookById = async (id) => {
  return await Book.findById(id);
};

exports.addBook = async (data) => {
  const book = new Book(data);
  const users = getAllGenreSubscribers(book.genre)
  const socketIds = checkAllUserIdsExistInSockets(users, userSockets)
  const result=await book.save();
  return {
    result,
    socketIds
  }
};

exports.updateBook = async (id, data) => {
  const book= await Book.findByIdAndUpdate(id, data, { new: true });
  const users = getAllGenreSubscribers(book.genre)
  const socketIds = checkAllUserIdsExistInSockets(users, userSockets)
  return {
    book,
    socketIds
  }
};

exports.deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

