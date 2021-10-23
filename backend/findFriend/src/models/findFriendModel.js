let mongoose = require("mongoose");

let FindFriendSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  matchUserId: {
    type: String,
    default: '',
  },
  gender: [String],
  art: [String],
  sport: [String],
  music: [String],
  faculty: [String],
});

const FindFriend = mongoose.model("FindFriend", FindFriendSchema);

module.exports = { FindFriend };