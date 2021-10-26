const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN } = require("../config/config");

function getToken(header) {
	const token = header && header.split(" ")[1];
	return token;
}

function createMatchingToken(userID) {
	// Create matching token (valid for a day)
	const token = jwt.sign({ _id: userID }, JWT_ACCESS_TOKEN, {
		expiresIn: "24h",
	});
	return token;
}

function decodeToken(req, res, next) {
	const token = getToken(req.headers["authorization"]);

	// console.log(token);
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
}

module.exports = { getToken, createMatchingToken, decodeToken };
