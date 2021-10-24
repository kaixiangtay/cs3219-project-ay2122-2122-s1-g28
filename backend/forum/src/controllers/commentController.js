const {
	resultsValidator,
	addCommentValidator,
} = require("../validators/commentValidator");
const { validationResult, check } = require("express-validator");
var userAuth = require("../middlewares/userAuth");
const postService = require("../services/postService");
const commentService = require("../services/commentService");

exports.viewPostComments = [
	userAuth.decodeAuthToken,
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
					msg: "There are no comments in this post!", // tells client that the post has no comments
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Comments retrieved successfully!",
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

exports.viewUserComments = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
			const comments = await commentService.getCommentsByUserId(userId, req.params.topic);
			const emptyCommentsDatabase = comments.length == 0;
			if (emptyCommentsDatabase) {
				return res.status(200).json({
					status: "success",
					msg: "This user does not have any comments!",
					data: comments,
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Comments retrieved successfully!",
					data: comments,
				});
			}
		} catch (err) {

		}
	}
];
exports.createComment = [
	userAuth.decodeAuthToken,
	addCommentValidator(),
	async (req, res) => {
		try {
			const userId = req.userId;
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
				userId,
				req.body,
				post
			);
			return res.status(200).json({
				status: "success",
				msg: "New comment created!",
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
	userAuth.decodeAuthToken,
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
				msg: "Comment retrieved successfully!",
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
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
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
			if (commentService.isUserComment(comment.userId, userId)) {
				comment = commentService.updateComment(comment, req.body);
				return res.status(200).json({
					status: "success",
					msg: "Comment has been updated!",
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
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
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

			if (commentService.isUserComment(comment.userId, userId)) {
				return res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote their own comments!",
				});
			} else {
				comment = commentService.upvoteComment(userId, comment);
				if (comment == null){
					return res.status(404).json({
						status: "error",
						msg: "Users can only upvote a comment ONCE!",
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
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
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

			if (commentService.isUserComment(comment.userId, userId)) {
				return res.status(404).json({
					status: "error",
					msg: "Users are not allowed to downvote their own comments!",
				});
			} else {
				comment = commentService.downvoteComment(userId, comment);
				if (comment == null){
					return res.status(404).json({
						status: "error",
						msg: "Users can only downvote a comment ONCE!",
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
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
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
			if (commentService.isUserComment(comment.userId, userId)) {
				await commentService.deleteComment(req.params.comment_id, post);
				res.status(200).json({
					status: "success",
					msg: "Comment has been deleted!",
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
	userAuth.decodeAuthToken,
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
					msg: "Comments retrieved successfully!",
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
	userAuth.decodeAuthToken,
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
					msg: "Comments retrieved successfully!",
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
	userAuth.decodeAuthToken,
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
					msg: "Comments retrieved successfully!",
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
	userAuth.decodeAuthToken,
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
					msg: "Comments retrieved successfully!", // tells client that the post has no comments
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
