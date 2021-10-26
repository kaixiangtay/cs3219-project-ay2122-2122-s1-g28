const mongoose = require("mongoose");

const FindFriendSchema = mongoose.Schema({
	userId: {
		type: String,
		unique: true,
		required: true,
	},
	matchUserId: {
		type: String,
		default: "",
	},
	isMatched: {
		type: Boolean,
		default: false,
	},
	roomId: {
		type: String,
	},
	isRandomSelection: {
		type: Boolean,
		default: false,
	},
	gender: [String],
	art: [String],
	sport: [String],
	music: [String],
	faculty: [String],
});

const FindFriend = mongoose.model("FindFriend", FindFriendSchema);

module.exports = FindFriend;
