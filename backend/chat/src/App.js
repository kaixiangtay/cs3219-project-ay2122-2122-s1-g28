const { port } = require("./config/config");

var http = require("http").createServer().listen(port);
var io = require("socket.io").listen(http);

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on("join", (roomId) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(roomId);
  });

  socket.on("chat", (roomId, message) => {
    console.log(`msg: ${message}, room: ${roomId}`);
    io.to(roomId).emit("chat", message);
  });
});
