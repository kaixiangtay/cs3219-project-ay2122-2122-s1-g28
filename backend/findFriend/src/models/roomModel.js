let mongoose = require("mongoose");

let roomSchema = mongoose.Schema({
  users: [String],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;