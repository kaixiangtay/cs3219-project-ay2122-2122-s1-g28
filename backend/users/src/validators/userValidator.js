const { check } = require('express-validator')

exports.userFieldsValidator = () => {
    return [
        check('name').notEmpty().withMessage("Name is a compulsory field"),
        check('email').notEmpty().withMessage("Email is a compulsory field"),
        check('password').notEmpty().withMessage("Password is a compulsory field"),
        check('email').contains("@u.nus.edu").withMessage("Email should be in the form of @u.nus.edu"),
        check('password').isStrongPassword().withMessage("Password should be of minimum length 8, consists of 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"),
    ]
};