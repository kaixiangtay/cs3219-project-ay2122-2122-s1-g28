const { userRegisterValidator, userLoginValidator, userPasswordValidator} = require('../validators/userValidator')
const { validationResult } = require('express-validator')
const bcrypt = require("bcrypt");
let User = require("../models/userModel");


exports.index = function (req, res) {
	User.get(function (err, users) {
		if (err) {
			return res.status(404).json({
				status: "error",
				message: "No Users in database found",
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
	userRegisterValidator(),
	(req, res) => { 

		const errors = validationResult(req);
	
		if (!errors.isEmpty()) {
		  return res.status(404).json(errors.array());
		}
		
		User.findOne({email:req.body.email}).then( user => {
			if(user){
				return res.status(404).json({
					status: "error",
					message: "Email exists",
				});
			} else {
				var user = new User();	
				user.name = req.body.name;
				user.email = req.body.email;

				// Use salting technique to generate a more secure hash
				const saltRounds = 10;
				// Hash the user password
				user.password = bcrypt.hashSync(req.body.password, saltRounds);

				user.save(function (err) {
					if (err) {
						res.status(404).json(err);
					} else {
						res.status(200).json({
							message: "New user created!",
							data: user,
						});
					}
				});
					}
		})	
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
	
			// Use salting technique to generate a more secure hash
			const saltRounds = 10;
			// Hash the user password
			user.password = bcrypt.hashSync(req.body.password, saltRounds);

			// save the user and check for errors
			user.save(function (err) {
				res.status(200).json({
					message: "User Info updated",
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
				message: "User details loading..",
				data: user,
			});
		}
	});
};

exports.deleteUser = function (req, res) {
	User.deleteOne(
		{
			_id: req.params.user_id,
		},
		function (err, user) {
			if (user == null) {
                res.status(404).json({ error: "User not found!"});
			} else {
				res.status(200).json({
					status: "Success",
					message: "User deleted",
				});
			}
		}
	);
};


exports.loginUser = [userLoginValidator(), (req, res) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res.status(404).json(errors.array());
	  }	
		
	  User.findOne({email:req.body.email}).then(user => {
		if (!user) {
            res.status(404).json({ error: "Email cannot be found!" });
        } else {
			const body = req.body;
			
			// compare user password with hashed password in database
			const validPassword = bcrypt.compareSync(body.password, user.password);

			if (validPassword) {
				res.status(200).json({ message: "Login successful!" });
			} else {
				res.status(400).json({ error: "Invalid Password!" });
			}
		}
	});
}
];