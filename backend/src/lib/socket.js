import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://192.168.0.146:5173'],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected ', socket.id);

  const userId = socket.handshake.query.userId;
  console.log(userId);
  if (userId) userSocketMap[userId] = socket.id;

  socket.on('disconnect', () => {
    console.log('A user disconnected ', socket.id);
    delete userSocketMap[userId];
  });
});

export { io, app, server };
