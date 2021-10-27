import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	topic: {
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
	upvotedUsers: [String],
	downvotedUsers: [String],
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
	displayDate: {
		type: String,
		default: new Date().toDateString(),
	},
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
