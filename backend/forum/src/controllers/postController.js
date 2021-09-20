const {resultsPostValidator, addPostValidator} = require("../validators/postValidator");
const {resultsCommentValidator, addCommentValidator} = require("../validators/commentValidator");
const { validationResult, check } = require("express-validator");
let Post = require("../models/postModel");
let Comment = require("../models/commentModel");

exports.index = function (req, res) {
	Post.get(function (err, posts) {
		if (err) {
			return res.status(404).json({
				status: "error",
				message: err,
			});
		}
		res.status(200).json({
			status: "success",
			message: "Posts retrieved successfully",
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
					message: "New Post created!",
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
				error: "Post not found!",
			});
			return;
		}
		if (err) res.send(err);
		res.status(200).json({
			message: "Post details loading..",
			data: post,
		});
	});
};

exports.updatePost = function (req, res) {
	Post.findById(req.params.post_id, function (err, post) {
		if (post == null) {
			res.status(404).json({
				error: "Post not found!",
			});
			return;
		}
		if (err) res.send(err);
		post.title = req.body.title ? req.body.title : post.title;
		post.content = req.body.content ? req.body.content : post.content;
		post.votes = req.body.votes ? req.body.votes : post.votes;
		// save the post and check for errors
		post.save(function (err) {
			if (err) res.json(err);
			res.status(200).json({
				message: "Post details updated",
				data: post,
			});
		});
	});
};

exports.deletePost = function (req, res) {
	Post.deleteOne(
		{
			_id: req.params.post_id,
		},
		function (err, post) {
			if (post == null) {
				res.status(404).json({
					error: "Post not found!",
				});
			} else {
                Comment.deleteMany({post_id: req.params.post_id}) //deletes all comments associated with the post
				if (err) res.send({ err });
				res.status(200).json({
					status: "Success",
					message: "Post deleted",
				});
			}
		}
	);
};

exports.viewPostComments = function async(req, res) {
	Post.findById({ _id: req.params.post_id })
		.populate("comments")
		.then((post, err) => {
			if (post == null) {
				res.status(404).json({
					error: "Comments are not found!",
				});
				return;
			}
			if (err) res.send(err);
            if (post.comments.length == 0) {
                res.status(404).json({
                    message: "There are no comments in this post",
                });
            } else {
			res.status(200).json({
				message: "Comment details loading..",
				data: post.comments,
			});
        }
		});
};

exports.createComment = [
	addCommentValidator(),
	(req, res) => {
        console.log('here')
		var comment = new Comment();
		comment.userName = req.body.userName;
		comment.userId = req.body.userId;
		comment.content = req.body.content;
        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(404).json(errors.array());
		}

		Post.findById(req.params.post_id, function (err, post) {
			if (post == null) {
				res.status(404).json({
					error: "Post not found!",
				});
				return;
			}
			if (err) res.send(err);
			comment.post = post;
			console.log("newComment", comment);
			comment.save();
			post.comments.push(comment);
			// save the post and check for errors
			post.save(function (err) {
				if (err) res.json(err);
				res.status(200).json({
					message: "Comment is created!",
					data: post,
				});
			});
		});
	},
];
