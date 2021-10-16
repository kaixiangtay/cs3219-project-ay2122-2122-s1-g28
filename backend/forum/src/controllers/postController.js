const {
	resultsPostValidator,
	addPostValidator,
} = require("../validators/postValidator");
const { validationResult, check } = require("express-validator");
let Post = require("../models/postModel");
let Comment = require("../models/commentModel");
var userAuth = require("../middlewares/userAuth");

exports.index = [
	userAuth.authenticateToken,
	(req, res) => {
		Post.find({ topic: req.params.topic }, function (err, posts) {
			if (err) {
				return res.status(404).json({
					status: "error",
					msg: err,
				});
			}

			if (posts.length == 0) {
				res.status(200).json({
					status: "success",
					msg: "There are no posts under this topic: " + req.params.topic,
					data: posts,
				});
				return;
			}

			res.status(200).json({
				status: "success",
				msg: "Posts retrieved successfully",
				data: posts,
			});
		});
	},
];

exports.createPost = [
	userAuth.authenticateToken,
	addPostValidator(),
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader);

		var post = new Post();
		post.userName = req.body.userName;
		post.userId = userId;
		post.topic = req.body.topic;
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

exports.viewPost = [
	userAuth.authenticateToken,
	(req, res) => {
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
				numberOfComments: post.comments.length,
			});
		});
	},
];

exports.updatePost = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader)._id;
		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}
			if (err) res.send(err);

			if (userId == post.userId) {
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
	},
];

exports.upvotePost = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader)._id;;

		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}
			if (err) res.send(err);

			if (userId == post.userId) {
				res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own posts",
				});
				return;
			} else {
				if (post.votedUsers.includes(userId)) {
					res.status(404).json({
						status: "error",
						msg: "Users can only upvote/downvote a post ONCE",
					});
					return;
				}
				post.votes = post.votes + 1;
				post.votedUsers.push(userId);
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
	},
];

exports.downvotePost = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader)._id;;

		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}
			if (err) res.send(err);

			if (userId == post.userId) {
				res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own posts",
				});
				return;
			} else {
				if (post.votedUsers.includes(userId)) {
					res.status(404).json({
						status: "error",
						msg: "Users can only upvote/downvote a post ONCE",
					});
					return;
				}
				post.votes = post.votes - 1;
				post.votedUsers.push(userId);
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
	},
];

exports.deletePost = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader)._id;;

		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}
			if (err) res.send(err);

			if (userId == post.userId) {
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
											msg: "Comment in post is not found!",
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
			} else {
				// checks if user is authorised to delete post
				res.status(404).json({
					status: "error",
					msg: "User is not authorised to delete this post",
				});
				return;
			}
		});
	},
];

exports.sortPostByAscVotes = [
	userAuth.authenticateToken,
	(req, res) => {
		var compareByVotes = { votes: 1 };
		Post.find({ topic: req.params.topic })
			.sort(compareByVotes)
			.exec((err, posts) => {
				if (err) {
					return res.status(404).json({
						status: "error",
						msg: err,
					});
				}

				if (posts.length == 0) {
					res.status(200).json({
						status: "success",
						msg: "There are no posts under this topic: " + req.params.topic,
						data: posts,
					});
					return;
				}

				res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
				});
			});
	},
];

exports.sortPostByDescVotes = [
	userAuth.authenticateToken,
	(req, res) => {
		var compareByVotes = { votes: -1 };
		Post.find({ topic: req.params.topic })
			.sort(compareByVotes)
			.exec((err, posts) => {
				if (err) {
					return res.status(404).json({
						status: "error",
						msg: err,
					});
				}

				if (posts.length == 0) {
					res.status(200).json({
						status: "success",
						msg: "There are no posts under this topic: " + req.params.topic,
						data: posts,
					});
					return;
				}

				res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
				});
			});
	},
];

exports.sortPostByAscDate = [
	userAuth.authenticateToken,
	(req, res) => {
		var compareByDate = { dateCreated: 1 };
		Post.find({ topic: req.params.topic })
			.sort(compareByDate)
			.exec((err, posts) => {
				if (err) {
					return res.status(404).json({
						status: "error",
						msg: err,
					});
				}

				if (posts.length == 0) {
					res.status(200).json({
						status: "success",
						msg: "There are no posts under this topic: " + req.params.topic,
						data: posts,
					});
					return;
				}

				res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
				});
			});
	},
];

exports.sortPostByDescDate = [
	userAuth.authenticateToken,
	(req, res) => {
		var compareByDate = { dateCreated: -1 };
		Post.find({ topic: req.params.topic })
			.sort(compareByDate)
			.exec((err, posts) => {
				if (err) {
					return res.status(404).json({
						status: "error",
						msg: err,
					});
				}

				if (posts.length == 0) {
					res.status(200).json({
						status: "success",
						msg: "There are no posts under this topic: " + req.params.topic,
						data: posts,
					});
					return;
				}

				res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
				});
			});
	},
];
