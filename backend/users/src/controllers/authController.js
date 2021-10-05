const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { ACCESS_TOKEN_KEY, RESET_PASSWORD_TOKEN_KEY } = require('../config/config');


exports.hashPassword = (userPassword) => {
	// Use salting technique to generate a more secure hash
    const saltRounds = 10;

    // Hash the user password
    const password = bcrypt.hashSync(userPassword, saltRounds);

    return password;
}

exports.comparePassword = (hashedPassword, inputPassword) => {
    return bcrypt.compareSync(hashedPassword, inputPassword);
}

exports.createAccessToken = (userEmail) => {
    // Create account sign up JWT token (valid for 15 mins)
    const token = jwt.sign(
        { email: userEmail },
        ACCESS_TOKEN_KEY,
        { expiresIn: "15m" }
    );
    return token;
}

exports.resetPasswordToken = (userEmail) => {
    // Create account password reset JWT token (valid for 15 mins)
    const token = jwt.sign(
        { email: userEmail },
        RESET_PASSWORD_TOKEN_KEY,
        { expiresIn: "15m" }
    );
    return token;
}

exports.createLoginToken = (userEmail) => {
    // Create account login JWT token (valid for a day)
    const token = jwt.sign(
        { email: userEmail },
        ACCESS_TOKEN_KEY,
        { expiresIn: "24h" }
    );
    return token;
}

exports.verifyToken = (token) => {
    try {
        var decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
        return decoded.email;
    } catch(err) {
        return err;
    }
}
