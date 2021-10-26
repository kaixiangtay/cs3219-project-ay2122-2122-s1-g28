import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN } from "../config/config";

function getToken(header) {
	const token = header && header.split(" ")[1];
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

module.exports = { getToken, decodeToken };
