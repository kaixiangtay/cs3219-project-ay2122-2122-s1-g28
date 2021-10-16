const {
  EMAIL,
  PORT,
  FRONTEND_URL,
  S3_BUCKET_NAME,
} = require("../config/config");

var User = require("../models/userModel");
var userAuth = require("../middlewares/userAuth");
const mailerService = require("../services/mailerService");
const imagerService = require("../services/imageService");
const { validationResult } = require("express-validator");
const {
  userRegisterValidator,
  userLoginValidator,
  userUpdateValidator,
} = require("../middlewares/userValidator");

exports.index = function (req, res) {
  User.get(function (err, users) {
    if (err) {
      return res.status(404).json({
        status: "error",
        msg: "No Users in database found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        msg: "Users retrieved successfully",
        data: users,
      });
    }
  });
};

exports.registerUser = [
  userRegisterValidator(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json(errors.array());
    } else {
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return res.status(404).json([
            {
              status: "error",
              msg: "Email already exists!",
            },
          ]);
        } else {
          var user = new User();
          user.name = req.body.name;
          user.email = req.body.email;
          user.password = userAuth.hashPassword(req.body.password);
          user.token = userAuth.createAccessToken(user.email);
          user.save();

          mailerService.sendEmail({
            from: EMAIL,
            to: user.email,
            subject: "NUSociaLife Account Verification",
            html: `<p>Click <a href="${FRONTEND_URL}/verify-email/${user.token}">here</a> to activate your account. Note: Link is only valid for 15 minutes!!!</p>`,
          });

          return res.status(200).json({
            status: "success",
            msg: "New user created!",
            data: user,
          });
        }
      });
    }
  },
];

// Resend verification email when token has expired after 15 mins
exports.resendActivationEmail = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    user.token = userAuth.createAccessToken(user.email);

    user.save(function (err) {
      if (err) {
        return res.status(404).json(err);
      } else {
        mailerService.sendEmail({
          from: EMAIL,
          to: user.email,
          subject: "NUSociaLife Account Verification",
          html: `<p>Click <a href="${FRONTEND_URL}/verify-email/${user.token}">here</a> to activate your account. Note: Link is only valid for 15 minutes!!!</p>`,
        });

        return res.status(200).json({
          status: "success",
          msg: "New account sign up email link sent!",
        });
      }
    });
  });
};

// API to verify user email from email link
exports.verifyUserEmail = function (req, res) {
  User.findOne({ token: req.params.token }, function (err, user) {
    const userEmail = userAuth.decodeTempToken(user.token);

    if (userEmail === user.email) {
      user.status = "Approved";
      user.save();

      return res.status(200).json({
        status: "success",
        msg: "Your email has been verified",
        data: user,
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "Link has expired!",
      });
    }
  });
};

// Send email for user to reset password
exports.sendResetPasswordEmail = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    user.token = userAuth.resetPasswordToken(user.email);

    user.save(function (err) {
      if (err) {
        return res.status(404).json(err);
      } else {
        mailerService.sendEmail({
          from: EMAIL,
          to: user.email,
          subject: "NUSociaLife Account Verification",
          html:
            '<p>Click <a href="http://localhost:' +
            PORT +
            "/api/users/resetPassword/" +
            user.token +
            '">here</a> to reset your password. Note: Link is only valid for 15 minutes!!!</p>',
        });

        return res.status(200).json({
          status: "success",
          msg: "Reset password email link sent!",
          data: user,
        });
      }
    });
  });
};

// Reset password when user not logged in to account (will use the same if password link expires)
exports.resetPassword = function (req, res) {
  User.findOne({ token: req.params.token }, function (err, user) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json(errors.array());
    }

    user.password = userAuth.hashPassword(req.body.password);
    user.save();

    return res.status(200).json({
      status: "success",
      msg: "User password has successfully been reset!",
      data: user,
    });
  });
};

// Upload Image into AWS S3 bucket
exports.uploadProfileImage = [
  userAuth.authenticateToken,
  (req, res) => {
    const authHeader = req.headers["authorization"];
    var userID = userAuth.decodeAuthToken(authHeader);

    User.findById(userID, function (err, user) {
      // frontend file name put to profileImage
      const uploadSingleImage = imagerService
        .upload(S3_BUCKET_NAME, user._id)
        .single("profileImage");

      uploadSingleImage(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            status: "error",
            msg: "Invalid file type, must be an image file!",
          });
        } else {
          user.profileImageUrl = req.file.location;
          user.save();

          return res.status(200).json({
            status: "success",
            msg: "User profile image uploaded successfully!",
            profileImageUrl: user.profileImageUrl,
          });
        }
      });
    });
  },
];

// Change user name and password in Profile page when user logged in to account
exports.updateUser = [
  userAuth.authenticateToken,
  userUpdateValidator(),
  (req, res) => {
    const authHeader = req.headers["authorization"];
    var userID = userAuth.decodeAuthToken(authHeader);

    User.findById(userID, function (err, user) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(404).json(errors.array());
      }

      user.name = req.body.name;

      if (req.body.password !== undefined) {
        user.password = userAuth.hashPassword(req.body.password);
      }

      user.save();

      return res.status(200).json({
        status: "success",
        msg: "User Info updated",
        data: {
          name: user.name,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
        },
      });
    });
  },
];

exports.viewUser = [
  userAuth.authenticateToken,
  (req, res) => {
    const authHeader = req.headers["authorization"];
    var userID = userAuth.decodeAuthToken(authHeader);

    User.findById(userID, function (err, user) {
      return res.status(200).json({
        status: "success",
        msg: "User details loading..",
        data: {
          name: user.name,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
        },
      });
    });
  },
];

exports.deleteUser = [
  userAuth.authenticateToken,
  (req, res) => {
    const authHeader = req.headers["authorization"];
    var userID = userAuth.decodeAuthToken(authHeader);

    User.findById(userID, function (err, user) {
      if (user.profileImageUrl !== "") {
        imagerService.delete(user.profileImageUrl);
      }

      User.deleteOne({ _id: user._id }, function (err, user) {
        return res.status(200).json({
          status: "success",
          msg: "User deleted",
        });
      });
    });
  },
];

exports.loginUser = [
  userLoginValidator(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json(errors.array());
    } else {
      User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          return res.status(404).json({
            status: "error",
            msg: "Email cannot be found!",
          });
        } else {
          if (user.status !== "Approved") {
            return res.status(400).json({
              status: "error",
              msg: "User is not verified, unable to login!",
            });
          }
          const body = req.body;

          // compare user password with hashed password in database
          const validPassword = userAuth.comparePassword(
            body.password,
            user.password
          );

          if (validPassword) {
            // Allow token access for a day
            user.token = userAuth.createLoginToken(user._id);
            user.save();

            return res.status(200).json({
              token: user.token,
              status: "success",
              msg: "Login successful!",
            });
          } else {
            return res.status(400).json({
              status: "error",
              msg: "Invalid Password!",
            });
          }
        }
      });
    }
  },
];

exports.logout = [
  userAuth.authenticateToken,
  (req, res) => {
    const authHeader = req.headers["authorization"];
    var userID = userAuth.decodeAuthToken(authHeader);

    User.findById(userID, function (err, user) {
      // Clear token before logout
      user.token = "";
      user.save();

      return res.status(200).json({
        status: "success",
        msg: "Have a nice day!",
      });
    });
  },
];
