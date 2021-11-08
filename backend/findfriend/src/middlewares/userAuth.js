import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN } from "../config/config.js";

function getToken(header) {
	const token = header && header.split(" ")[1];
	return token;
}

function decodeToken(req, res, next) {
	const token = getToken(req.headers["authorization"]);
	const returnMsg = {
		success: "error",
		msg: "Unauthorized to access data",
	};

	if (!token) {
		// No token in req header
		return res.status(401).json(returnMsg);
	}

	try {
		const decoded = jwt.verify(token, JWT_ACCESS_TOKEN);
		req.userId = decoded._id;
		return next();
	} catch (error) {
		// Invalid token detected in req header
		return res.status(401).json(returnMsg);
	}
}

export default { decodeToken };
