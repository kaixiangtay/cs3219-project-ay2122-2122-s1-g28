const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN } = require("../config/config");

exports.getToken = (header) => {
	const token = header && header.split(" ")[1];
	return token;
};

exports.decodeAuthToken = (req, res, next) => {
	const token = this.getToken(req.headers["authorization"]);

	if (!token) {
		// No token in req header
		return res.status(401).json({
			success: "error",
			msg: "Unauthorized to access data",
		});
	}

	try {
		const decoded = jwt.verify(token, JWT_ACCESS_TOKEN);
		req.userId = decoded._id;
		return next();
	} catch (error) {
		// Invalid token detected in req header
		return res.status(401).json({
			success: "error",
			msg: "Unauthorized to access data",
		});
	}
};
