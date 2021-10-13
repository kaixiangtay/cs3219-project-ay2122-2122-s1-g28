const {
	resultsPostValidator,
	addPostValidator,
} = require("../validators/postValidator");
const { validationResult, check } = require("express-validator");
let Post = require("../models/postModel");
let Comment = require("../models/commentModel");

exports.index = function (req, res) {
	Post.get(function (err, posts) {
		if (err) {
			return res.status(404).json({
				status: "error",
				msg: err,
			});
		}
		res.status(200).json({
			status: "success",
			msg: "Posts retrieved successfully",
			data: posts,
		});
	});
};

exports.createPost = [
	addPostValidator(),
	(req, res) => {
		var post = new Post();
		post.userName = req.body.userName;
		post.userId = req.body.userId;
		post.title = req.body.title;
		post.content = req.body.content;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(404).json(errors.array());
		}
		post.save(function (err) {
			if (err) {
				res.json(err);
			} else {
				res.status(200).json({
					status: "success",
					msg: "New Post created!",
					data: post,
				});
			}
		});
	},
];

exports.viewPost = function (req, res) {
	Post.findById(req.params.post_id, function (err, post) {
		if (post == null) {
			res.status(404).json({
				status: "error",
				msg: "Post not found!",
			});
			return;
		}
		if (err) res.send(err);
		res.status(200).json({
			status: "success",
			msg: "Post details loading..",
			data: post,
		});
	});
};

exports.updatePost = function (req, res) {
	Post.findById(req.params.post_id, function (err, post) {
		if (post == null) {
			res.status(404).json({
				status: "error",
				msg: "Post not found!",
			});
			return;
		}
		if (err) res.send(err);
		var userId = req.params.user_id;
		var postUserId = post.userId;

		if (userId == postUserId) {
			post.title = req.body.title ? req.body.title : post.title;
			post.content = req.body.content ? req.body.content : post.content;
		} else {
			res.status(404).json({
				status: "error",
				msg: "User is not authorised to edit this post",
			});
			return;
		}
		// save the post and check for errors
		post.save(function (err) {
			if (err) res.json(err);
			res.status(200).json({
				status: "success",
				msg: "Post details updated",
				data: post,
			});
		});
	});
};

exports.upvotePost = function (req, res) {
	Post.findById(req.params.post_id, function (err, post) {
		if (post == null) {
			res.status(404).json({
				status: "error",
				msg: "Post not found!",
			});
			return;
		}
		if (err) res.send(err);
		var userId = req.params.user_id;
		var postUserId = post.userId;

		if (userId == postUserId) {
			res.status(404).json({
				status: "error",
				msg: "Users are not allowed to upvote/downvote their own posts",
			});
			return;
		} else {
			post.votes = post.votes + 1;
		}
		post.save(function (err) {
			if (err) res.json(err);
			res.status(200).json({
				status: "success",
				msg: "Post has been upvoted!",
				data: post,
			});
		});
	});
};

exports.downvotePost = function (req, res) {
	Post.findById(req.params.post_id, function (err, post) {
		if (post == null) {
			res.status(404).json({
				status: "error",
				msg: "Post not found!",
			});
			return;
		}
		if (err) res.send(err);
		var userId = req.params.user_id;
		var postUserId = post.userId;

		if (userId == postUserId) {
			res.status(404).json({
				status: "error",
				msg: "Users are not allowed to upvote/downvote their own posts",
			});
			return;
		} else {
			if (post.votes == 0) {
				res.status(404).json({
					status: "error",
					msg: "Vote count is already at 0, downvote is not allowed",
				});
				return;
			}
			post.votes = post.votes - 1;
		}
		post.save(function (err) {
			if (err) res.json(err);
			res.status(200).json({
				status: "success",
				msg: "Post has been downvoted!",
				data: post,
			});
		});
	});
};

exports.deletePost = function (req, res) {
	Post.findById(req.params.post_id, function (err, post) {
		if (post == null) {
			res.status(404).json({
				status: "error",
				msg: "Post not found!",
			});
			return;
		}
		if (err) res.send(err);
		var userId = req.params.user_id;
		var postUserId = post.userId;

		if (userId == postUserId) {
			Post.deleteOne(
				{
					_id: req.params.post_id,
				},
				function (err, post) {
					if (post == null) {
						res.status(404).json({
							status: "error",
							msg: "Post not found!",
						});
					} else {
						Comment.deleteMany(
							{ post_id: req.params.post_id },
							function (err, comment) {
								if (comment == null) {
									res.status(404).json({
										status: "error",
										msg: "Comment in post not found!",
									});
									return;
								}
								if (err) res.send({ err });
								res.status(200).json({
									status: "success",
									msg: "Post deleted",
								});
							}
						); //deletes all comments associated with the post
					}
				}
			);
		} else { // checks if user is authorised to delete post 
			res.status(404).json({
				status: "error",
				msg: "User is not authorised to delete this post",
			});
			return;
		}
	});
};

exports.sortPostByAscVotes = function (req, res) {
	var compareByVotes = { votes: 1 };
	Post.find()
		.sort(compareByVotes)
		.exec((err, posts) => {
			if (err) {
				return res.status(404).json({
					status: "error",
					msg: err,
				});
			}
			res.status(200).json({
				status: "success",
				msg: "Posts retrieved successfully",
				data: posts,
			});
		});
};

exports.sortPostByDescVotes = function (req, res) {
	var compareByVotes = { votes: -1 };
	Post.find()
		.sort(compareByVotes)
		.exec((err, posts) => {
			if (err) {
				return res.status(404).json({
					status: "error",
					msg: err,
				});
			}
			res.status(200).json({
				status: "success",
				msg: "Posts retrieved successfully",
				data: posts,
			});
		});
};

exports.sortPostByAscDate = function (req, res) {
	var compareByDate = { dateCreated: 1 };
	Post.find()
		.sort(compareByDate)
		.exec((err, posts) => {
			if (err) {
				return res.status(404).json({
					status: "error",
					msg: err,
				});
			}
			res.status(200).json({
				status: "success",
				msg: "Posts retrieved successfully",
				data: posts,
			});
		});
};

exports.sortPostByDescDate = function (req, res) {
	var compareByDate = { dateCreated: -1 };
	Post.find()
		.sort(compareByDate)
		.exec((err, posts) => {
			if (err) {
				return res.status(404).json({
					status: "error",
					msg: err,
				});
			}
			res.status(200).json({
				status: "success",
				msg: "Posts retrieved successfully",
				data: posts,
			});
		});
};
