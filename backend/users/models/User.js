var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}