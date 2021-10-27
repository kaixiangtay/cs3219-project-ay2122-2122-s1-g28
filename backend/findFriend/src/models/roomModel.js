import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
	users: [String],
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
