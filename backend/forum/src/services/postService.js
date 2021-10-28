import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

async function getAllPosts(inputTopic) {
	const posts = await Post.find({ topic: inputTopic });
	return posts;
}

function createPost(userId, inputData) {
	const post = new Post();
	post.name = inputData.name;
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
	const posts = await Post.find({ userId, topic: inputTopic });
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
			post.votes += 2;
		} else {
			post.votes += 1;
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
			post.votes -= 2;
		} else {
			post.votes -= 1;
		}
		post.downvotedUsers.push(userId);
		post.save();
		return post;
	}
}

async function deletePost(postId) {
	const statusPost = await Post.deleteOne({ _id: postId });
	const statusComment = await Comment.deleteMany({ postId: postId });
	return statusPost.deletedCount;
}

async function sortPostByVotes(inputTopic, order) {
	const compareByVotes = { votes: order };
	const posts = await Post.find({ topic: inputTopic }).sort(compareByVotes);
	return posts;
}

async function sortPostByDate(inputTopic, order) {
	const compareByDate = { dateCreated: order };
	const posts = await Post.find({ topic: inputTopic }).sort(compareByDate);
	return posts;
}

function isUserPost(postUserId, userId) {
	return userId == postUserId;
}

export default {
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
