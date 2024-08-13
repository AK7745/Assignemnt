const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../app');
const Book = require('../models/book-model');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Book API', () => {
  let bookId;

  it('should create a new book', async () => {
    const res = await request(server).post('/api/books').send({
      title: 'Test Book',
      author: 'John Doe',
      genre: 'Fiction',
      publishedYear: 2021,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    bookId = res.body._id;
  });

  it('should retrieve all books', async () => {
    const res = await request(server).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should retrieve a book by ID', async () => {
    const res = await request(server).get(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', bookId);
  });

  it('should update a book by ID', async () => {
    const res = await request(server).put(`/api/books/${bookId}`).send({
      title: 'Updated Test Book',
      author: 'Jane Doe',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Book');
  });

  it('should delete a book by ID', async () => {
    const res = await request(server).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Book deleted');
  });
});
