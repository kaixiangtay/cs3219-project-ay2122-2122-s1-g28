var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
  token: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
