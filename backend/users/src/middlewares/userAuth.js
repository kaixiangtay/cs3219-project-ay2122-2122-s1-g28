import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_ACCESS_TOKEN } from "../config/config";

function hashPassword(userPassword) {
	// Use salting technique to generate a more secure hash
	const saltRounds = 10;

	// Hash the user password
	const password = bcrypt.hashSync(userPassword, saltRounds);

	return password;
}

function comparePassword(hashedPassword, inputPassword) {
	return bcrypt.compareSync(hashedPassword, inputPassword);
}

function createSignUpToken(userEmail) {
	// Create account sign up JWT token (valid for 15 mins)
	const token = jwt.sign({ email: userEmail }, JWT_ACCESS_TOKEN, {
		expiresIn: "15m",
	});
	return token;
}

function createLoginToken(userID) {
	// Create account login JWT token (valid for a day)
	const token = jwt.sign({ _id: userID }, JWT_ACCESS_TOKEN, {
		expiresIn: "24h",
	});
	return token;
}

function getToken(header) {
	const token = header && header.split(" ")[1];
	return token;
}

// For forgot password and new email sign ups
function decodeTempToken(req, res, next) {
	const token = req.params.token;

	if (!token) {
		// No token in req header
		return res.status(401).json({
			success: "error",
			msg: "Unauthorized to access data",
		});
	}

	try {
		const decoded = jwt.verify(token, JWT_ACCESS_TOKEN);
		req.email = decoded.email;
		return next();
	} catch (error) {
		// Invalid token detected in req header
		return res.status(401).json({
			success: "error",
			msg: "Unauthorized to access data",
		});
	}
}

// For API routes after user has login
function decodeAuthToken(req, res, next) {
	const token = getToken(req.headers["authorization"]);

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

module.exports = {
	decodeAuthToken,
	decodeTempToken,
	createLoginToken,
	createSignUpToken,
	hashPassword,
	comparePassword,
};
