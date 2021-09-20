const { resultsValidator, registerUserValidator } = require('../validators/userValidator')
const { validationResult, check } = require('express-validator')
let User = require("../models/userModel");

exports.index = function (req, res) {
	User.get(function (err, users) {
		if (err) {
			return res.status(404).json({
				status: "error",
				message: err,
			});
		}
		res.status(200).json({
			status: "success",
			message: "Users retrieved successfully",
			data: users,
		});
	});
};

exports.registerUser = [
	registerUserValidator(),
	(req, res, ) => { 
		
		var user = new User();
		user.name = req.body.name;
		user.email = req.body.email;
		user.password = req.password;

		const errors = validationResult(req);
	
		if (!errors.isEmpty()) {
		  return res.status(404).json(errors.array());
		}
		user.save(function (err) {
			if (err) {
				res.json(err);
			} else {
				res.status(200).json({
					message: "New user created!",
					data: user,
				});
			}
		});
	}
  ];


// exports.new = function (req, res) {
// 	var user = new User();
// 	user.name = req.body.name;
//     console.log(req.body.name)
// 	user.email = req.body.email;
// 	// save the user and check for errors
// 	if (!req.body.name) {
// 		res.status(404).json({
// 			error: "Name is a compulsory field!",
// 		});
// 	} else {
// 		user.save(function (err) {
// 			if (err) res.json(err);
// 			res.json({
// 				message: "New user created!",
// 				data: user,
// 			});
// 		});
// 	}
// };

exports.viewAllUsers = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (user == null) {
            res.status(404).json({
                error: "User not found!",
            });
            return;
        }
		if (err) res.send(err);
		res.status(200).json({
			message: "User details loading..",
			data: user,
		});
	});
};

exports.updateUser = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
        if (user == null) {
            res.status(404).json({
                error: "User not found!",
            });
            return;
        }
		if (err) res.send(err);
		user.name = req.body.name ? req.body.name : user.name;
		user.email = req.body.email ? req.body.email : user.email;
		user.password = req.body.password ? req.body.password : user.password;
		// save the user and check for errors
		user.save(function (err) {
			if (err) res.json(err);
			res.status(200).json({
				message: "User Info updated",
				data: user,
			});
		});
	});
};

exports.deleteUser = function (req, res) {
	User.deleteOne(
		{
			_id: req.params.user_id,
		},
		function (err, user) {
			if (user == null) {
                res.status(404).json({
                    error: "User not found!",
                });
			} else {
				if (err) res.send({ err });
				res.status(200).json({
					status: "Success",
					message: "User deleted",
				});
			}
		}
	);
};