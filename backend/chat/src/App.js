const { port } = require("./config/config");

const io = require("socket.io")(port); //hosted on localhost:<port number>

io.on("connection", (socket) => {
  const id = socket.handshake.query.id; //passed in from client, static id that stays the same whenever page refreshes
  socket.join(id); //Join the room

  //Handles when a message is sent (not sure if we need this way of filtering recipients also?)
  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient); //removing current recipient from list of recipients
      newRecipients.push(id); //id of the person sending the message

      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });

  //Handles when a user leaves the room
  socket.on("disconnect", () => {
    // Put in implementation here
  });
});

// Following this tutorial: https://youtu.be/tBr-PybP_9c?t=5141
// Socketio Room docs: https://socket.io/docs/v4/rooms/
