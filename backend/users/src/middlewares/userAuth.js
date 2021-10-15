const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_ACCESS_TOKEN, JWT_RESET_PASSWORD_TOKEN } = require('../config/config');

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
        JWT_ACCESS_TOKEN,
        { expiresIn: "15m" }
    );
    return token;
}

exports.resetPasswordToken = (userEmail) => {
    // Create account password reset JWT token (valid for 15 mins)
    const token = jwt.sign(
        { email: userEmail },
        JWT_RESET_PASSWORD_TOKEN,
        { expiresIn: "15m" }
    );
    return token;
}

exports.createLoginToken = (userID) => {
    // Create account login JWT token (valid for a day)
    const token = jwt.sign(
        { _id: userID },
        JWT_ACCESS_TOKEN,
        { expiresIn: "24h" }
    );
    return token;
}

exports.getToken = (header) => {
    const token = header && header.split(' ')[1];
    return token;
}

// For forgot password and new email sign ups
exports.decodeTempToken = (token) => {
    var decoded = jwt.verify(token, JWT_ACCESS_TOKEN);
    return decoded.email;
}

exports.decodeAuthToken = (header) => {
    const token = this.getToken(header);
    var decoded = jwt.verify(token, JWT_ACCESS_TOKEN);
    return decoded;
};

exports.authenticateToken = (req, res, next) => {
    const token = this.getToken(req.headers['authorization']);

    if (!token) {
        return res.sendStatus(401);
    }
    
    jwt.verify(token, JWT_ACCESS_TOKEN, function(err) {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
};