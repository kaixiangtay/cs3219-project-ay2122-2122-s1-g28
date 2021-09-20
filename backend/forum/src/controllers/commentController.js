const { resultsValidator, addCommentValidator } = require('../validators/commentValidator')
const { validationResult, check } = require('express-validator')
let Comment = require("../models/commentModel");

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
				if (err) res.send({ err });
				res.status(200).json({
					status: "Success",
					message: "Comment deleted",
				});
			}
		}
	);
};