import express from "express";
import { PORT } from "./config/config.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  let socketRoom;

  socket.on("join", (roomId) => {
    console.log(`Socket ${socket.id} joining ${roomId}`);
    socket.join(roomId);
    socketRoom = roomId;
  });

  //   socket.on("video", (data) => {
  //     io.to(socketRoom).emit("video", data);
  //   });

  socket.on("chat", (data) => {
    // var { token, message } = data;
    io.to(socketRoom).emit("chat", data);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
    io.to(socketRoom).emit("leave", true);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
