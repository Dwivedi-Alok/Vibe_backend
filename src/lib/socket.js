import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://vibe-frontend-umber.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const userSocketMap = {}; // { userId: socketId[] }

// Helper function
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    // Support multiple sockets per user (tabs/devices)
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socket.id);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    if (userId && userSocketMap[userId]) {
      userSocketMap[userId] = userSocketMap[userId].filter(
        (id) => id !== socket.id
      );
      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
