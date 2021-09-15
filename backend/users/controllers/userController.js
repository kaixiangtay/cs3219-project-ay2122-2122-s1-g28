let User = require("../models/User");

exports.index = function (req, res) {
	User.get(function (err, users) {
		if (err) {
			return res.json({
				status: "error",
				message: err,
			});
		}
		res.json({
			status: "success",
			message: "Users retrieved successfully",
			data: users,
		});
	});
};

exports.new = function (req, res) {
	var user = new User();
	user.name = req.body.name;
    console.log(req.body.name)
	user.email = req.body.email;
	// save the user and check for errors
	if (!req.body.name) {
		res.status(404).json({
			error: "Name is a compulsory field!",
		});
	} else {
		user.save(function (err) {
			if (err) res.json(err);
			res.json({
				message: "New user created!",
				data: user,
			});
		});
	}
};

exports.view = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (user == null) {
            res.status(404).json({
                error: "User not found!",
            });
            return;
        }
		if (err) res.send(err);
		res.json({
			message: "User details loading..",
			data: user,
		});
	});
};

exports.update = function (req, res) {
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
		// save the user and check for errors
		user.save(function (err) {
			if (err) res.json(err);
			res.json({
				message: "User Info updated",
				data: user,
			});
		});
	});
};

exports.delete = function (req, res) {
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
				res.json({
					status: "Success",
					message: "User deleted",
				});
			}
		}
	);
};