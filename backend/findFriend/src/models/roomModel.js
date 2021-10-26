const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	users: [String],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
