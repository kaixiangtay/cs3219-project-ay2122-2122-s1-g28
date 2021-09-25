const { resultsValidator, addCommentValidator } = require('../validators/commentValidator')
const { validationResult, check } = require('express-validator')
let Comment = require("../models/commentModel");
let Post = require("../models/postModel");


exports.viewPostComments = function async(req, res) {
	Post.findById({ _id: req.params.post_id })
		.populate("comments")
		.then((post, err) => {
			if (post == null) {
				res.status(404).json({
					error: "Comments not found!",
				});
				return;
			}
			if (err) res.send(err);
            if (post.comments.length == 0) {
                res.status(200).json({
                    message: "There are no comments in this post", // tells client that the post has no comments 
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
			comment.postId = req.params.post_id;
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


exports.viewComment = function (req, res) {
	Comment.findById(req.params.comment_id, function (err, comment) {
		if (comment == null) {
            res.status(404).json({
                error: "Comment not found!",
            });
            return;
        }
		if (err) res.send(err);
		res.status(200).json({
			message: "Comment details loading..",
			data: comment,
		});
	});
};

exports.updateComment = function (req, res) {
	Comment.findById(req.params.comment_id, function (err, comment) {
        if (comment == null) {
            res.status(404).json({
                error: "Comment not found!",
            });
            return;
        }
		if (err) res.send(err);
		comment.content = req.body.content ? req.body.content : comment.content;
		// save the comment and check for errors
		comment.save(function (err) {
			if (err) res.json(err);
			res.status(200).json({
				message: "Comment content updated",
				data: comment,
			});
		});
	});
};

exports.deleteComment = function (req, res) {
	Comment.deleteOne(
		{
			_id: req.params.comment_id,
		},
		function (err, comment) {
			if (comment == null) {
                res.status(404).json({
                    error: "Comment not found!",
                });
			} else {
                Post.findById(req.params.post_id, function (err, post) {
                    if (post == null) {
                        res.status(404).json({
                            error: "Comment not found!",
                        });
                        return;
                    }
                    if (err) res.send(err);
                    post.comments.remove(req.params.comment_id) // removes comment in Post Collection 
                    // save the post and check for errors
                    post.save(function (err) {
                        if (err) res.json(err);
                        res.status(200).json({
                            status: "Success",
                            message: "Comment deleted",
                        });
                    });
                })
			}
		}
	);
};