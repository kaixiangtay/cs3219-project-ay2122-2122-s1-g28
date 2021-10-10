const { EMAIL, port } = require('../config/config');

var User = require("../models/userModel");
var authController = require('../controllers/authController');
const mailer = require("../services/mailer");
const { validationResult } = require('express-validator')
const { userRegisterValidator, userLoginValidator, userPasswordValidator} = require('../validators/userValidator')

exports.index = function (req, res) {
	User.get(function (err, users) {
		if (err) {
			return res.status(404).json({
				status: "error",
				msg: "No Users in database found",
			});
		} else {
			res.status(200).json({
				status: "success",
				msg: "Users retrieved successfully",
				data: users,
			});
		}	
	});
};

exports.registerUser = [
	userRegisterValidator(),
	(req, res) => { 

		const errors = validationResult(req);
	
		if (!errors.isEmpty()) {
		  return res.status(404).json(errors.array());
		} else {
			User.findOne({email:req.body.email}).then( user => {
				if (user) {
					return res.status(404).json([{
						status: "error",
						msg: "Email already exists!",
					}]);
				} else {
					var user = new User();
	
					user.name = req.body.name;
					user.email = req.body.email;
					user.password = authController.hashPassword(req.body.password);
					user.token = authController.createAccessToken(user.email);
					
					user.save(function (err) {
						if (err) {
							res.status(404).json(err);
						} else {
							mailer.sendEmail({
								from: EMAIL,
								to: user.email,
								subject: "NUSociaLife Account Verification",	
								html: '<p>Click <a href="http://localhost:' + port +'/api/users/verify-email/' + user.token + '">here</a> to activate your account. Note: Link is only valid for 15 minutes!!!</p>'	
							});
	
							res.status(200).json({
								msg: "New user created!",
								data: user,
							});
						}
					});
				}
			})	
		}
	}
  ];

// Resend verification email when token has expired after 15 mins
exports.resendActivationEmail = function (req, res) {
	User.findOne({email:req.body.email}, function (err, user) {

		user.token = authController.createAccessToken(user.email);
		
		user.save(function (err) {
			if (err) {
				res.status(404).json(err);
			} else {
				mailer.sendEmail({
					from: EMAIL,
					to: user.email,
					subject: "NUSociaLife Account Verification",	
					html: '<p>Click <a href="http://localhost:' + port +'/api/users/verifyAccount/' + user.token + '">here</a> to activate your account. Note: Link is only valid for 15 minutes!!!</p>'	
				});

				res.status(200).json({
					msg: "New account sign up email link sent!",
				});
			}
		});
	});
}

exports.verifyUserEmail = function (req, res) {
	User.findOne({token:req.params.token}, function (err, user) {
		if (!user) {
            res.status(404).json({ error: "Invalid Verification Link!" });
        } else {
			const userEmail = authController.verifyToken(user.token);

			if (userEmail === user.email) {
				user.status = "Approved";
					
				// save the user and check for errors
				user.save(function (err) {
					res.status(200).json({
						msg: "Your email has been verified",
						data: user,
					});
				});
			} else {
				res.status(404).json({ error: "Link has expired!" });
			}
		}
	});
};

// Send email for user to reset password
exports.sendResetPasswordEmail = function (req, res) {
	User.findOne({email:req.body.email}, function (err, user) {

		user.token = authController.resetPasswordToken(user.email);
		
		user.save(function (err) {
			if (err) {
				res.status(404).json(err);
			} else {
				mailer.sendEmail({
					from: EMAIL,
					to: user.email,
					subject: "NUSociaLife Account Verification",	
					html: '<p>Click <a href="http://localhost:' + port +'/api/users/resetPassword/' + user.token + '">here</a> to reset your password. Note: Link is only valid for 15 minutes!!!</p>'	
				});

				res.status(200).json({
					msg: "Reset password email link sent!",
					data: user
				});
			}
		});
	});
}

// Reset password when user not logged in to account (will use the same if password link expires)
exports.resetPassword = function (req, res) { 
		User.findOne({token:req.params.token}, function (err, user) {
			if (!user) {
				res.status(404).json({
					error: "User not found!",
				});
				return;
			}

			const errors = validationResult(req);
	
			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
	
			user.password = authController.hashPassword(req.body.password);

			// save the user and check for errors
			user.save(function (err) {
				res.status(200).json({
					msg: "User password has successfully been reset!",
					data: user,
				});
			});
		});
		
	};


// Change user Password in Profile page when user logged in to account
exports.updateUser = [
	userPasswordValidator(),
	(req, res) => { 

		User.findById(req.params.user_id, function (err, user) {
			if (!user) {
				res.status(404).json({
					error: "User not found!",
				});
				return;
			}

			const errors = validationResult(req);
	
			if (!errors.isEmpty()) {
				return res.status(404).json(errors.array());
			}
	
			user.password = authController.hashPassword(req.body.password);

			// save the user and check for errors
			user.save(function (err) {
				res.status(200).json({
					msg: "User Info updated",
					data: user,
				});
			});
		});
		
	}
  ];

exports.viewUser = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (!user) {
            res.status(404).json({ error: "User not found!" });
        } else {
			res.status(200).json({
				msg: "User details loading..",
				data: user,
			});
		}
	});
};

exports.deleteUser = function (req, res) {
	User.deleteOne({_id: req.params.user_id}, function (err, user) {
		if (user == null) {
			res.status(404).json({ error: "User not found!"});
		} else {
			res.status(200).json({
				status: "Success",
				msg: "User deleted",
			});
		}
	});
};


exports.loginUser = [userLoginValidator(), (req, res) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res.status(404).json(errors.array());
	} else {
		User.findOne({email:req.body.email}).then(user => {
			if (!user) {
				res.status(404).json({ error: "Email cannot be found!" });
			} else {
				const body = req.body;
				
				// compare user password with hashed password in database
				const validPassword = authController.comparePassword(body.password, user.password);
	
				if (validPassword) {
					// Allow token access for a day
					user.token = authController.createLoginToken(user.email);

					res.status(200).json({ msg: "Login successful!" });
				} else {
					res.status(400).json({ error: "Invalid Password!" });
				}
			}
		});
	}
}];
