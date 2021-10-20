const {
	resultsValidator,
	addCommentValidator,
} = require("../validators/commentValidator");
const { validationResult, check } = require("express-validator");
let Comment = require("../models/commentModel");
let Post = require("../models/postModel");
var userAuth = require("../middlewares/userAuth");
const postService = require("../services/postService");
const commentService = require("../services/commentService");
const { createPost } = require("./postController");

exports.viewPostComments = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}

			const comments = await commentService.getAllComments(req.params.post_id);
			if (comments == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comments not found!",
				});
			} else if (comments.length == 0) {
				return res.status(200).json({
					status: "success",
					msg: "There are no comments in this post", // tells client that the post has no comments
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Comment details loading..",
					data: comments,
				});
			}
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.createComment = [
	userAuth.authenticateToken,
	addCommentValidator(),
	async (req, res) => {
		try {
			const authHeader = req.headers["authorization"];
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			const comment = commentService.createComment(
				authHeader,
				req.body,
				post
			);
			return res.status(200).json({
				status: "success",
				msg: "Comment is created!",
				data: comment,
			});
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.viewComment = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}

			const comment = await commentService.getCommentByID(req.params.comment_id);
			if (comment == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
			}
			return res.status(200).json({
				status: "success",
				msg: "Comment details loading..",
				data: comment,
			});
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.updateComment = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const authHeader = req.headers["authorization"];
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			let comment = await commentService.getCommentByID(req.params.comment_id);
			if (comment == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
			}
			if (commentService.isUserComment(comment.userId, authHeader)) {
				comment = commentService.updateComment(comment, req.body);
				return res.status(200).json({
					status: "success",
					msg: "Comment content updated",
					data: comment,
				});
			} else {
				return res.status(404).json({
					status: "error",
					msg: "User is not authorised to edit this comment",
				});
			}
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.upvoteComment = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const authHeader = req.headers["authorization"];
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			let comment = await commentService.getCommentByID(req.params.comment_id);
			if (comment == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
			}

			if (commentService.isUserComment(comment.userId, authHeader)) {
				return res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own comments",
				});
			} else {
				comment = commentService.upvoteComment(authHeader, comment);
				if (comment == null){
					return res.status(404).json({
						status: "error",
						msg: "Users can only upvote/downvote a comment ONCE",
					});
				} else {
					return res.status(200).json({
						status: "success",
						msg: "Comment has been upvoted!",
						data: comment,
					});
				}
			}
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.downvoteComment = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const authHeader = req.headers["authorization"];
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			let comment = await commentService.getCommentByID(req.params.comment_id);
			if (comment == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
			}

			if (commentService.isUserComment(comment.userId, authHeader)) {
				return res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own comments",
				});
			} else {
				comment = commentService.downvoteComment(authHeader, comment);
				if (comment == null){
					return res.status(404).json({
						status: "error",
						msg: "Users can only upvote/downvote a comment ONCE",
					});
				} else {
					return res.status(200).json({
						status: "success",
						msg: "Comment has been downvoted!",
						data: comment,
					});
				}
			}
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.deleteComment = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const authHeader = req.headers["authorization"];
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			const comment = await commentService.getCommentByID(req.params.comment_id);
			if (comment == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comment not found!",
				});
			}
			if (commentService.isUserComment(comment.userId, authHeader)) {
				await commentService.deleteComment(req.params.comment_id, post);
				res.status(200).json({
					status: "success",
					msg: "Comment deleted",
				});
			} else {
				return res.status(404).json({
					status: "error",
					msg: "User is not authorised to delete this comment",
				});
			}
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.sortCommentsByAscVotes = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}

			const comments = await commentService.sortCommentByVotes(req.params.post_id, 1);
			if (comments == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comments not found!",
				});
			} else if (comments.legnth == 0) {
				return res.status(200).json({
					status: "sucess",
					msg: "There are no comments in this post", // tells client that the post has no comments
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Comment details loading..",
					data: comments,
				});
			}
		} catch {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.sortCommentsByDescVotes = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}

			const comments = await commentService.sortCommentByVotes(req.params.post_id, -1);
			if (comments == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comments not found!",
				});
			} else if (comments.legnth == 0) {
				return res.status(200).json({
					status: "sucess",
					msg: "There are no comments in this post", // tells client that the post has no comments
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Comment details loading..",
					data: comments,
				});
			}
		} catch {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.sortCommentsByAscDate = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}

			const comments = await commentService.sortCommentByDate(req.params.post_id, 1);
			if (comments == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comments not found!",
				});
			} else if (comments.legnth == 0) {
				return res.status(200).json({
					status: "sucess",
					msg: "There are no comments in this post", // tells client that the post has no comments
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Comment details loading..",
					data: comments,
				});
			}
		} catch {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.sortCommentsByDescDate = [
	userAuth.authenticateToken,
	async (req, res) => {
		try {
			const post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}

			const comments = await commentService.sortCommentByDate(req.params.post_id, -1);
			if (comments == null) {
				return res.status(404).json({
					status: "error",
					msg: "Comments not found!",
				});
			} else if (comments.legnth == 0) {
				return res.status(200).json({
					status: "sucess",
					msg: "There are no comments in this post", // tells client that the post has no comments
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Comment details loading..",
					data: comments,
				});
			}
		} catch {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];
