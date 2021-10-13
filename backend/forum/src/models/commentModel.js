var mongoose = require("mongoose");


var CommentSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  votedUsers: [String],
  postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },

});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
}