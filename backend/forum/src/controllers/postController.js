const {
	resultsPostValidator,
	addPostValidator,
} = require("../validators/postValidator");
const { validationResult, check } = require("express-validator");
const userAuth = require("../middlewares/userAuth");
const postService = require("../services/postService");

exports.index = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const posts = await postService.getAllPosts(req.params.topic);
			const emptyPostDatabase = posts.length == 0;

			if (emptyPostDatabase) {
				return res.status(200).json({
					status: "success",
					msg: "There are no posts under this topic: " + req.params.topic,
					data: posts,
				});
			}
			return res.status(200).json({
				status: "success",
				msg: "Posts retrieved successfully",
				data: posts,
			});
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.createPost = [
	userAuth.decodeAuthToken,
	addPostValidator(),
	(req, res) => {
		try {
			const userId = req.userId;
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
			const post = postService.createPost(userId, req.body);
			return res.status(200).json({
				status: "success",
				msg: "New Post created!",
				data: post,
			});
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.viewPost = [
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
			return res.status(200).json({
				status: "success",
				msg: "Post details loading..",
				data: post,
				numberOfComments: post.comments.length,
			});
		} catch (err) {
			return res.status(404).json({
				status: "error",
				msg: err.toString(),
			});
		}
	},
];

exports.updatePost = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
			let post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}

			if (postService.isUserPost(post.userId, userId)) { // userId == postId
				post = await postService.updatePost(post, req.body);
				return res.status(200).json({
					status: "success",
					msg: "Post details updated",
					data: post,
				});
			} else {
				return res.status(404).json({
					status: "error",
					msg: "User is not authorised to edit this post",
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

exports.upvotePost = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
			let post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			if (postService.isUserPost(post.userId, userId)) {
				return res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own posts",
				});
			} else {
				post = postService.upvotePost(userId, post);
				if (post == null) {
					return res.status(404).json({
						status: "error",
						msg: "Users can only upvote a post ONCE",
					});
				} else {
					return res.status(200).json({
						status: "success",
						msg: "Post has been upvoted!",
						data: post,
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

exports.downvotePost = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
			let post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			if (postService.isUserPost(post.userId, userId)) {
				return res.status(404).json({
					status: "error",
					msg: "Users are not allowed to upvote/downvote their own posts",
				});
			} else {
				post = postService.downvotePost(userId, post);
				if (post == null) {
					return res.status(404).json({
						status: "error",
						msg: "Users can only downvote a post ONCE",
					});
				} else {
					return res.status(200).json({
						status: "success",
						msg: "Post has been downvoted!",
						data: post,
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

exports.deletePost = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const userId = req.userId;
			let post = await postService.getPostByID(req.params.post_id);
			if (post == null) {
				return res.status(404).json({
					status: "error",
					msg: "Post not found!",
				});
			}
			if (postService.isUserPost(post.userId, userId)) {
				await postService.deletePost(post.id);
				return res.status(200).json({
					status: "success",
					msg: "Post deleted",
				});
			} else {
				return res.status(404).json({
					status: "error",
					msg: "User is not authorised to delete this post",
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

exports.sortPostByAscVotes = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const posts = await postService.sortPostByVotes(req.params.topic, 1);
			if (posts.length == 0) {
				return res.status(200).json({
					status: "success",
					msg: "There are no posts under this topic: " + req.params.topic,
					data: posts,
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
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

exports.sortPostByDescVotes = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const posts = await postService.sortPostByVotes(req.params.topic, -1);
			if (posts.length == 0) {
				return res.status(200).json({
					status: "success",
					msg: "There are no posts under this topic: " + req.params.topic,
					data: posts,
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
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

exports.sortPostByAscDate = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const posts = await postService.sortPostByDate(req.params.topic, 1);
			if (posts.length == 0) {
				return res.status(200).json({
					status: "success",
					msg: "There are no posts under this topic: " + req.params.topic,
					data: posts,
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
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

exports.sortPostByDescDate = [
	userAuth.decodeAuthToken,
	async (req, res) => {
		try {
			const posts = await postService.sortPostByDate(req.params.topic, -1);
			if (posts.length == 0) {
				return res.status(200).json({
					status: "success",
					msg: "There are no posts under this topic: " + req.params.topic,
					data: posts,
				});
			} else {
				return res.status(200).json({
					status: "success",
					msg: "Posts retrieved successfully",
					data: posts,
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
