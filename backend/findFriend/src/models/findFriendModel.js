var mongoose = require("mongoose");

var FindFriendSchema = mongoose.Schema({
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

module.exports = FindFriend;

module.exports.get = function (callback, limit) {
    FindFriend.find(callback).limit(limit);
}