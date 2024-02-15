const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Store active users and their corresponding rooms
const activeUsers = {};

io.on('connection', (socket) => {
  // console.log( "user connected")

  socket.on('createRoom', (roomName, username) => {
    const room = roomName.trim().toLowerCase();
    if (!room || !username) {
      return;
    }

    // Leave the previously joined room, if any
    if (socket.room) {
      socket.leave(socket.room);
      io.to(socket.room).emit('userLeft', socket.username);
    }

    // Store the user's room and username
    socket.room = room;
    socket.username = username;
    activeUsers[socket.id] = {
      room: room,
      username: username,
    };

    // console.log(activeUsers)

    // Create a private namespace for the room
    const roomNamespace = io.of(`/${room}`);
    roomNamespace.on('connection', (privateSocket) => {
      privateSocket.emit('message', 'Welcome to the private room!');
      // Handle private room-specific events here if needed
    });

    // Notify other users in the room about the new user
    socket.join(room);
    io.to(room).emit('userJoined', socket.username);

    // Notify the user about the active users in the room
    const usersInRoom = getUsersInRoom(room);
    io.to(socket.id).emit('activeUsers', usersInRoom);
  });

  socket.on('joinRoom', (roomName, username) => {
    const room = roomName.trim().toLowerCase();
    if (!room || !username) {
      return;
    }

    // Leave the previously joined room, if any
    if (socket.room) {
      socket.leave(socket.room);
      io.to(socket.room).emit('userLeft', socket.username);
    }

    // Store the user's room and username
    socket.room = room;
    socket.username = username;
    activeUsers[socket.id] = {
      room: room,
      username: username,
    };

    // Notify other users in the room about the new user
    socket.join(room);
    io.to(room).emit('userJoined', socket.username);

    // Notify the user about the active users in the room
    const usersInRoom = getUsersInRoom(room);
    io.to(socket.id).emit('activeUsers', usersInRoom);
  });

  socket.on('sendMessage', (message) => {
    const room = socket.room;
    io.to(room).emit('message', {
      username: socket.username,
      message: message,
    });
  });

  socket.on('typing', () => {
    const room = socket.room;
    socket.to(room).emit('userTyping', socket.username);
  });
  
  socket.on('stopTyping', () => {
    const room = socket.room;
    socket.to(room).emit('userStopTyping', socket.username);
  });

  socket.on('disconnect', () => {
    const userData = activeUsers[socket.id];
    if (userData) {
      const room = userData.room;
      delete activeUsers[socket.id];
      io.to(room).emit('userLeft', userData.username);
      // console.log("user disconnected")
    }
  });
});

function getUsersInRoom(room) {
  return Object.values(activeUsers)
    .filter((user) => user.room === room)
    .map((user) => user.username);
}

http.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});