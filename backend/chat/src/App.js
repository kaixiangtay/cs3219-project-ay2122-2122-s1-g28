import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
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

app.use(Router);

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
	path: "/api/chat/socket.io",
});

var clients = {};

io.on("connection", (socket) => {
	console.log(`Connected: ${socket.id}`);

	socket.on("join", (data) => {
		const roomId = data;
		console.log(roomId);
		console.log(`Socket ${socket.id} joining ${roomId}`);
		socket.join(roomId);
		// Add user to clients
		clients[socket.id] = roomId;

		const roomSize = io.sockets.adapter.rooms.get(roomId).size;

		if (roomSize == 2) {
			io.to(roomId).emit("profileRequest", "Please send your profile request");
		}
	});

	socket.on("profileRetrieval", (data) => {
		const { roomId, token, profile } = data;
		io.to(roomId).emit("profileRetrieval", data);
	});

	socket.on("chat", (data) => {
		const { roomId, token, message } = data;
		io.to(roomId).emit("chat", data);
	});

	socket.on("disconnect", () => {
		const roomId = clients[socket.id];
		console.log(`Disconnected: ${socket.id}`);
		io.to(roomId).emit("leave", roomId);
		// Delete user from clients
		delete clients[socket.id];
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server is running at PORT ${PORT}`);
});
