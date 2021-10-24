let Post = require("../models/postModel");
let Comment = require("../models/commentModel");

async function getAllPosts(inputTopic) {
	const posts = await Post.find({ topic: inputTopic });
	return posts;
}

function createPost(userId, inputData) {
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

async function getPostsByUserID(userId, inputTopic) {
	const posts = await Post.find({ userId: userId, topic: inputTopic });
	return posts;
}

function updatePost(post, inputData) {
	post.title = inputData.title ? inputData.title : post.title;
	post.content = inputData.content ? inputData.content : post.content;
	post.save();
	return post;
}

function upvotePost(userId, post) {
	if (post.upvotedUsers.includes(userId)) {
		return null;
	} else {
		if (post.downvotedUsers.includes(userId)) {
			post.downvotedUsers.remove(userId);
			post.votes = post.votes + 2;
		} else {
			post.votes = post.votes + 1;
		}		
		post.upvotedUsers.push(userId);
		post.save();
		return post;
	}
}

function downvotePost(userId, post) {
	if (post.downvotedUsers.includes(userId)) {
		return null;
	} else {
		if (post.upvotedUsers.includes(userId)) {
			post.upvotedUsers.remove(userId);
			post.votes = post.votes - 2;
		} else {
			post.votes = post.votes - 1;
		}
		post.downvotedUsers.push(userId);
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

function isUserPost(postUserId, userId) {
	return userId == postUserId;
}
module.exports = {
	getAllPosts,
	createPost,
	getPostByID,
	getPostsByUserID,
	updatePost,
	upvotePost,
	downvotePost,
	deletePost,
	sortPostByVotes,
	sortPostByDate,
	isUserPost,
};
