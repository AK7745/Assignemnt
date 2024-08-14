const userSockets = {};  

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);


    socket.on('registerUser', (userId) => {
      userSockets[userId] = socket.id;  
      console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
    });
    socket.on('disconnect', () => {
      for (const [userId, id] of Object.entries(userSockets)) {
        if (id === socket.id) {
          delete userSockets[userId];
          console.log(`User ${userId} disconnected and removed from mapping`);
          break;
        }
      }
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports.userSockets = userSockets;
