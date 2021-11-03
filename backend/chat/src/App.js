import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from "cors";
import Router from "./routes/chatRoutes.js";
import { PORT } from "./config/config.js";

const app = express();
const httpServer = createServer(app);

app.use(cors()); // setup cross origin resource sharing

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Enable cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use(Router);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  let socketRoom;

  socket.on("join", (data) => {
    const { roomId } = data;
    console.log(`Socket ${socket.id} joining ${roomId}`);
    socket.join(roomId);
    socketRoom = roomId;

    const roomSize = io.sockets.adapter.rooms.get(socketRoom).size;

    if (roomSize == 2) {
      io.to(socketRoom).emit(
        "profileRequest",
        "Please send your profile request"
      );
    }
  });

  socket.on("profileRetrieval", (data) => {
    io.to(socketRoom).emit("profileRetrieval", data);
  });

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
