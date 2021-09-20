const {resultsPostValidator, addPostValidator} = require("../validators/postValidator");
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
                Comment.deleteMany({post_id: req.params.post_id}, function (err, comment) {
                    if (comment == null) {
                        res.status(404).json({
                            error: "Comment in post not found!",
                        });
                        return;
                    }
                    if (err) res.send({ err });
                    res.status(200).json({
                        status: "Success",
                        message: "Post deleted",
                    });
                });//deletes all comments associated with the post
			}
		}
	);
};

