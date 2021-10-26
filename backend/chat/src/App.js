// eslint-disable-next-line import/order
const { port } = require("./config/config");

const express = require("express");

const app = express();

const http = require("http");

const server = http.createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
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

	socket.on("chat", (data) => {
		// var { token, message } = data;
		io.to(socketRoom).emit("chat", data);
	});

	socket.on("disconnect", () => {
		console.log(`Disconnected: ${socket.id}`);
		io.to(socketRoom).emit("leave", true);
	});
});

server.listen(port, () => {
	console.log(`Server is running at PORT ${port}`);
});
