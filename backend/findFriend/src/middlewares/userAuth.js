const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN } = require('../config/config')

exports.getToken = (header) => {
    const token = header && header.split(' ')[1];
    return token;
}

exports.createMatchingToken = (userID) => {
    // Create matching token (valid for a day)
    const token = jwt.sign(
        { _id: userID },
        JWT_ACCESS_TOKEN,
        { expiresIn: "24h" }
    );
    return token;
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