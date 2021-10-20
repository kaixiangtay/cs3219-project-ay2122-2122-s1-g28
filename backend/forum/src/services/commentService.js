let Post = require("../models/postModel");
let Comment = require("../models/commentModel");
var userAuth = require("../middlewares/userAuth");

async function getAllComments(postId) {
	const post = await Post.findById({ _id: postId }).populate("comments");
	if (post == null) {
		return null;
	}
	return post.comments;
}

function createComment(authHeader, inputData, post) {
	var userId = userAuth.decodeAuthToken(authHeader);
	var comment = new Comment();
	comment.userName = inputData.userName;
	comment.userId = userId;
	comment.content = inputData.content;
    comment.postId = post._id
    comment.save();
    post.comments.push(comment);
    post.save();
	return comment;
}

async function getCommentByID(commentId) {
    const comment = await Comment.findById(commentId);
    return comment;
}

function updateComment(comment, inputData) {
    comment.content = inputData.content ? inputData.content : comment.content;
    comment.save();
    return comment;
}   

function upvoteComment(authHeader, comment) {
	var userId = userAuth.decodeAuthToken(authHeader)._id;
	if (comment.votedUsers.includes(userId)) {
		return null;
	} else {
		comment.votes = post.votes + 1;
		comment.votedUsers.push(userId);
		comment.save();
		return comment;
	}
}

function downvoteComment(authHeader, comment) {
	var userId = userAuth.decodeAuthToken(authHeader)._id;
	if (comment.votedUsers.includes(userId)) {
		return null;
	} else {
		comment.votes = post.votes - 1;
		comment.votedUsers.push(userId);
		comment.save();
		return comment;
	}
}

function isUserComment(commentUserId, authHeader) {
	var userId = userAuth.decodeAuthToken(authHeader)._id;
	return userId == commentUserId;
}

async function deleteComment(commentId, post) {
    await Comment.deleteOne({_id: commentId});
    post.comments.remove(commentId);
    post.save();
}

async function sortCommentByVotes(postId, order) {
	var compareByVotes = { votes: order };
	const post = await Post.findById({ _id: postId }).populate({ path: "comments", options: { sort: compareByVotes } });
    if (post == null) {
        return null;
    }
	return post.comments;
}

async function sortCommentByDate(postId, order) {
	var compareByDate = { dateCreated: order };
	const post = await Post.findById({ _id: postId }).populate({ path: "comments", options: { sort: compareByDate } });
    if (post == null) {
        return null;
    }
	return post.comments;
}

module.exports = { getAllComments, createComment, getCommentByID, updateComment, upvoteComment, downvoteComment, deleteComment, sortCommentByVotes, sortCommentByDate, isUserComment };
