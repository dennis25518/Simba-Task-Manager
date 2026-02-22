import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "Server is running", message: "Connect via Socket.io" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

const PORT = process.env.PORT || 5000;

// Store active rooms and participants
const rooms = {};
const userSockets = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins a room
  socket.on("join-room", ({ roomId, userName, userId }) => {
    socket.join(roomId);
    userSockets[socket.id] = { roomId, userName, userId };

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push({ socketId: socket.id, userName, userId });

    // Notify others in the room
    socket.broadcast.to(roomId).emit("user-joined", {
      socketId: socket.id,
      userName,
      userId,
    });

    // Send list of existing participants to the new user
    const existingParticipants = rooms[roomId].filter(
      (p) => p.socketId !== socket.id,
    );
    socket.emit("existing-participants", existingParticipants);

    console.log(`${userName} joined room ${roomId}`);
  });

  // Handle chat messages
  socket.on("send-message", ({ roomId, message, sender, timestamp }) => {
    io.to(roomId).emit("receive-message", {
      message,
      sender,
      timestamp,
      socketId: socket.id,
    });
    console.log(`Message in ${roomId}: ${message}`);
  });

  // Handle WebRTC signaling
  socket.on("send-offer", ({ offer, toSocket }) => {
    io.to(toSocket).emit("receive-offer", { offer, fromSocket: socket.id });
  });

  socket.on("send-answer", ({ answer, toSocket }) => {
    io.to(toSocket).emit("receive-answer", { answer, fromSocket: socket.id });
  });

  socket.on("send-ice-candidate", ({ candidate, toSocket }) => {
    io.to(toSocket).emit("receive-ice-candidate", {
      candidate,
      fromSocket: socket.id,
    });
  });

  // Handle call initiation
  socket.on("initiate-call", ({ roomId, callerId, callerName }) => {
    socket.broadcast.to(roomId).emit("incoming-call", {
      callerId,
      callerName,
    });
  });

  // Handle call acceptance
  socket.on("accept-call", ({ roomId, callerId }) => {
    io.to(callerId).emit("call-accepted", { acceptorId: socket.id });
  });

  // Handle call rejection
  socket.on("reject-call", ({ roomId, callerId }) => {
    io.to(callerId).emit("call-rejected");
  });

  // User leaves room
  socket.on("leave-room", ({ roomId, userName }) => {
    socket.leave(roomId);
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((p) => p.socketId !== socket.id);
      socket.broadcast.to(roomId).emit("user-left", {
        socketId: socket.id,
        userName,
      });
    }
    delete userSockets[socket.id];
    console.log(`${userName} left room ${roomId}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const userData = userSockets[socket.id];
    if (userData) {
      const { roomId, userName } = userData;
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter((p) => p.socketId !== socket.id);
        io.to(roomId).emit("user-disconnected", {
          socketId: socket.id,
          userName,
        });
      }
    }
    delete userSockets[socket.id];
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});
