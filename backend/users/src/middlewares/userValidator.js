const { check } = require('express-validator')

const userNameValidator = () => {
    return [
        check('name').notEmpty().withMessage("Name is a compulsory field"),
    ]
}

const userEmailValidator = () => {
    return [
    check('email')
    .custom(value => {
        const domain = value.substring(value.lastIndexOf("@") + 1)
        if (domain === "u.nus.edu") {
            return true
        } else {
            return false
        }
    })
    .withMessage("Email should be in the form of @u.nus.edu"),
    ]
}

const userPasswordValidator = () => {
    return [
        check('password').isStrongPassword().withMessage("Password should be of minimum length 8, consists of 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"),
    ]
}

const userRegisterValidator = () => {
    return [
       userNameValidator(),
       userEmailValidator(),
       userPasswordValidator(),
    ]
};

const userLoginValidator = () => {
    return [
        userEmailValidator(),
        userPasswordValidator(),
     ]
}

const userUpdateValidator = () => {
    return [
        check('password').optional().isStrongPassword().withMessage("Password should be of minimum length 8, consists of 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"),
    ]
}

module.exports = { userRegisterValidator, userLoginValidator, userUpdateValidator };
