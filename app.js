const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const bookRoutes = require('./routes/book-routes');
const { connectDb } = require('./database/database');
const sockets = require('./sockets/sockets');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', bookRoutes);

connectDb()

sockets(io)

module.exports = { server, io };
