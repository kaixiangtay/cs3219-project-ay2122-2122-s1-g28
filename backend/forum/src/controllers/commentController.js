const {
	resultsValidator,
	addCommentValidator,
} = require("../validators/commentValidator");
const { validationResult, check } = require("express-validator");
let Comment = require("../models/commentModel");
let Post = require("../models/postModel");
var userAuth = require("../middlewares/userAuth");

exports.viewPostComments = [
	userAuth.authenticateToken,
	async (req, res) => {
		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}

			Post.findById({ _id: req.params.post_id })
				.populate("comments")
				.then((post, err) => {
					if (post == null) {
						res.status(404).json({
							status: "error",
							msg: "Comments not found!",
						});
						return;
					}
					if (err) res.send(err);
					if (post.comments.length == 0) {
						res.status(200).json({
							status: "success",
							msg: "There are no comments in this post", // tells client that the post has no comments
						});
					} else {
						res.status(200).json({
							status: "success",
							msg: "Comment details loading..",
							data: post.comments,
						});
					}
				});
		});
	},
];

exports.createComment = [
	userAuth.authenticateToken,
	addCommentValidator(),
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader);

		var comment = new Comment();
		comment.userName = req.body.userName;
		comment.userId = userId;
		comment.content = req.body.content;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(404).json(errors.array());
		}

		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}
			if (err) res.send(err);
			comment.postId = req.params.post_id;
			comment.save();
			post.comments.push(comment);
			// save the post and check for errors
			post.save(function (err) {
				if (err) res.json(err);
				res.status(200).json({
					status: "success",
					msg: "Comment is created!",
					data: post,
				});
			});
		});
	},
];

exports.viewComment = [
	userAuth.authenticateToken,
	(req, res) => {
		Comment.findById(req.params.comment_id, function (err, comment) {
			if (comment == null) {
				res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
				return;
			}
			if (err) res.send(err);
			res.status(200).json({
				status: "success",
				msg: "Comment details loading..",
				data: comment,
			});
		});
	},
];

exports.updateComment = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader);

		Comment.findById(req.params.comment_id, function (err, comment) {
			if (comment == null) {
				res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
				return;
			}
			if (err) res.send(err);

			if (userId == comment.userId) {
				comment.content = req.body.content ? req.body.content : comment.content;
			} else {
				res.status(404).json({
					status: "error",
					msg: "User is not authorised to edit this comment",
				});
				return;
			}
			// save the comment and check for errors
			comment.save(function (err) {
				if (err) res.json(err);
				res.status(200).json({
					status: "success",
					msg: "Comment content updated",
					data: comment,
				});
			});
		});
	},
];

exports.upvoteComment = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader);

		Comment.findById(req.params.comment_id, function (err, comment) {
			if (comment == null) {
				res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
				return;
			}
			if (err) res.send(err);

			if (userId == comment.userId) {
				res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own comments",
				});
				return;
			} else {
				if (comment.votedUsers.includes(userId)) {
					res.status(404).json({
						status: "error",
						msg: "Users can only upvote/downvote a comment ONCE",
					});
					return;
				}
				comment.votes = comment.votes + 1;
				comment.votedUsers.push(userId);
			}
			// save the comment and check for errors
			comment.save(function (err) {
				if (err) res.json(err);
				res.status(200).json({
					status: "success",
					msg: "Comment has been upvoted!",
					data: comment,
				});
			});
		});
	},
];

exports.downvoteComment = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader);

		Comment.findById(req.params.comment_id, function (err, comment) {
			if (comment == null) {
				res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
				return;
			}
			if (err) res.send(err);

			if (userId == comment.userId) {
				res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own comments",
				});
				return;
			} else {
				if (comment.votedUsers.includes(userId)) {
					res.status(404).json({
						status: "error",
						msg: "Users can only upvote/downvote a comment ONCE",
					});
					return;
				}
				comment.votes = comment.votes - 1;
				comment.votedUsers.push(userId);
			}
			// save the comment and check for errors
			comment.save(function (err) {
				if (err) res.json(err);
				res.status(200).json({
					status: "success",
					msg: "Comment has been downvoted!",
					data: comment,
				});
			});
		});
	},
];

exports.deleteComment = [
	userAuth.authenticateToken,
	(req, res) => {
		const authHeader = req.headers["authorization"];
		var userId = userAuth.decodeAuthToken(authHeader);

		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}
			if (err) res.send(err);
			Comment.findById(req.params.comment_id, function (err, comment) {
				if (comment == null) {
					res.status(404).json({
						status: "error",
						msg: "Comment not found!",
					});
					return;
				}

				if (userId == comment.userId) {
					Comment.deleteOne(
						{
							_id: req.params.comment_id,
						},
						function (err, comment) {
							post.comments.remove(req.params.comment_id); // removes comment in Post Collection
							// save the post and check for errors
							post.save(function (err) {
								if (err) res.json(err);
								res.status(200).json({
									status: "success",
									msg: "Comment deleted",
								});
							});
						}
					);
				} else {
					res.status(404).json({
						status: "error",
						msg: "User is not authorised to delete this comment",
					});
					return;
				}
			});
		});
	},
];

exports.sortCommentsByAscVotes = [
	userAuth.authenticateToken,
	async (req, res) => {
		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}

			Post.findById({ _id: req.params.post_id })
				.populate({ path: "comments", options: { sort: { votes: 1 } } })
				.then((post, err) => {
					if (post == null) {
						res.status(404).json({
							status: "error",
							msg: "Comments not found!",
						});
						return;
					}
					if (err) res.send(err);
					if (post.comments.length == 0) {
						res.status(200).json({
							status: "sucess",
							msg: "There are no comments in this post", // tells client that the post has no comments
						});
					} else {
						res.status(200).json({
							status: "success",
							msg: "Comment details loading..",
							data: post.comments,
						});
					}
				});
		});
	},
];

exports.sortCommentsByDescVotes = [
	userAuth.authenticateToken,
	async (req, res) => {
		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}

			Post.findById({ _id: req.params.post_id })
				.populate({ path: "comments", options: { sort: { votes: -1 } } })
				.then((post, err) => {
					if (post == null) {
						res.status(404).json({
							status: "error",
							msg: "Comments not found!",
						});
						return;
					}
					if (err) res.send(err);
					if (post.comments.length == 0) {
						res.status(200).json({
							status: "success",
							msg: "There are no comments in this post", // tells client that the post has no comments
						});
					} else {
						res.status(200).json({
							status: "success",
							msg: "Comment details loading..",
							data: post.comments,
						});
					}
				});
		});
	},
];

exports.sortCommentsByAscDate = [
	userAuth.authenticateToken,
	async (req, res) => {
		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}

			Post.findById({ _id: req.params.post_id })
				.populate({ path: "comments", options: { sort: { dateCreated: 1 } } })
				.then((post, err) => {
					if (post == null) {
						res.status(404).json({
							status: "error",
							msg: "Comments not found!",
						});
						return;
					}
					if (err) res.send(err);
					if (post.comments.length == 0) {
						res.status(200).json({
							status: "sucess",
							msg: "There are no comments in this post", // tells client that the post has no comments
						});
					} else {
						res.status(200).json({
							status: "success",
							msg: "Comment details loading..",
							data: post.comments,
						});
					}
				});
		});
	},
];

exports.sortCommentsByDescDate = [
	userAuth.authenticateToken,
	async (req, res) => {
		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
				return;
			}

			Post.findById({ _id: req.params.post_id })
				.populate({ path: "comments", options: { sort: { dateCreated: -1 } } })
				.then((post, err) => {
					if (post == null) {
						res.status(404).json({
							status: "error",
							msg: "Comments not found!",
						});
						return;
					}
					if (err) res.send(err);
					if (post.comments.length == 0) {
						res.status(200).json({
							status: "success",
							msg: "There are no comments in this post", // tells client that the post has no comments
						});
					} else {
						res.status(200).json({
							status: "success",
							msg: "Comment details loading..",
							data: post.comments,
						});
					}
				});
		});
	},
];
