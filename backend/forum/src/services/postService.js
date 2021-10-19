let Post = require("../models/postModel");
let Comment = require("../models/commentModel");
var userAuth = require("../middlewares/userAuth");

async function getAllPosts(inputTopic) {
	const posts = await Post.find({ topic: inputTopic });
	return posts;
}

function createPost(authHeader, inputData) {
	var userId = userAuth.decodeAuthToken(authHeader);
	let post = new Post();
	post.userName = inputData.userName;
	post.userId = userId;
	post.topic = inputData.topic;
	post.title = inputData.title;
	post.content = inputData.content;
	post.save();
	return post;
}

async function getPostByID(postId) {
	const post = await Post.findById(postId);
	return post;
}

function updatePost(post, inputData) {
	post.title = inputData.title ? inputData.title : post.title;
	post.content = inputData.content ? inputData.content : post.content;
	post.save();
	return post;
}

function upvotePost(authHeader, post) {
	var userId = userAuth.decodeAuthToken(authHeader)._id;
	if (post.votedUsers.includes(userId)) {
		return null;
	} else {
		post.votes = post.votes + 1;
		post.votedUsers.push(userId);
		post.save();
		return post;
	}
}

function downvotePost(authHeader, post) {
	var userId = userAuth.decodeAuthToken(authHeader)._id;
	if (post.votedUsers.includes(userId)) {
		return null;
	} else {
		post.votes = post.votes - 1;
		post.votedUsers.push(userId);
		post.save();
		return post;
	}
}

async function deletePost(postId) {
	await Post.deleteOne({ _id: postId });
	await Comment.deleteMany({ post_id: postId });
}

async function sortPostByVotes(inputTopic, order) {
	var compareByVotes = { votes: order };
	const posts = await Post.find({ topic: inputTopic }).sort(compareByVotes);
	return posts;
}

async function sortPostByDate(inputTopic, order) {
	var compareByDate = { dateCreated: order };
	const posts = await Post.find({ topic: inputTopic }).sort(compareByDate);
	return posts;
}

function isUserPost(postUserId, authHeader) {
	var userId = userAuth.decodeAuthToken(authHeader)._id;
	return userId == postUserId;
}
module.exports = {
	getAllPosts,
	createPost,
	getPostByID,
	updatePost,
	upvotePost,
	downvotePost,
	deletePost,
	sortPostByVotes,
	sortPostByDate,
	isUserPost,
};
