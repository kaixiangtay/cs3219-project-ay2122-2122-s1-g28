const { S3_BUCKET_NAME } = require("../config/config");
const userAuth = require("../middlewares/userAuth");
const userService = require("../services/userService");
const imageService = require("../services/imageService");
const { validationResult } = require("express-validator");
const {
  userRegisterValidator,
  userLoginValidator,
  userUpdateValidator,
} = require("../middlewares/userValidator");

exports.index = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const emptyUserDatabase = users.length == 0;

    if (emptyUserDatabase) {
      return res.status(200).json({
        status: "success",
        msg: "No Users in database found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        msg: "Users retrieved successfully",
        data: users,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: err.toString(),
    });
  }
};

// Register new user
exports.registerUser = [
  userRegisterValidator(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json(errors.array());
      }

      let user = await userService.getUserByEmail(req.body.email);

      if (user) {
        return res.status(404).json([
          {
            status: "error",
            msg: "Email already exists!",
          },
        ]);
      } else {
        user = userService.createUser(req.body);

        return res.status(200).json({
          status: "success",
          msg: "New user created!",
          data: user,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

// Resend verification email when token has expired after 15 mins
exports.resendEmail = async (req, res) => {
  try {
    let user = await userService.getUserByToken(req.params.token);
    const userEmail = userAuth.decodeTempToken(user.token);

    if (!userEmail) {
      return res.status(404).json({
        status: "error",
        msg: "Invalid email detected!",
      });
    }

    if (user.isVerified) {
      return res.status(404).json({
        status: "error",
        msg: "Account has been verified!",
      });
    }

    console.log(user);
    userService.resendEmail(user);

    return res.status(200).json({
      status: "success",
      msg: "New account sign up email link have been resend!",
      token: user.token,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: err.toString(),
    });
  }
};

// API to verify user email from email link
exports.verifyUserEmail = async (req, res) => {
  try {
    let user = await userService.getUserByToken(req.params.token);
    const userEmail = userAuth.decodeTempToken(user.token);

    if (userEmail !== user.email) {
      return res.status(404).json({
        status: "error",
        msg: "Link has expired!",
      });
    }

    user = userService.verifyUser(user);

    return res.status(200).json({
      status: "success",
      msg: "Your email has been verified",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: err.toString(),
    });
  }
};

// Send email for user to reset password
exports.resetPassword = async (req, res) => {
  try {
    let user = await userService.getUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({
        status: "error",
        msg: "Invalid email detected!",
      });
    } else {
      userService.resetPassword(user);

      return res.status(200).json({
        status: "success",
        msg: "Reset password email link with temporary password sent!",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: err.toString(),
    });
  }
};

// Upload Image into AWS S3 bucket
exports.uploadProfileImage = [
  userAuth.authenticateToken,
  async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      let user = await userService.getUserByID(authHeader);

      // frontend file name put to profileImage
      const uploadSingleImage = imageService
        .upload(S3_BUCKET_NAME, user._id)
        .single("profileImage");

      uploadSingleImage(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            status: "error",
            msg: "Invalid file type, must be an image file!",
          });
        } else {
          user = userService.saveProfileImageUrl(user, req.file.location);

          return res.status(200).json({
            status: "success",
            msg: "Profile uploaded successfully!",
            data: {
              name: user.name,
              email: user.email,
              profileImageUrl: user.profileImageUrl,
            },
          });
        }
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

// Change user name and password in Profile page when user logged in to account
exports.updateUser = [
  userAuth.authenticateToken,
  userUpdateValidator(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json(errors.array());
      }

      const authHeader = req.headers["authorization"];
      let user = await userService.updateUser(authHeader, req.body);

      return res.status(200).json({
        status: "success",
        msg: "Changes saved successfully",
        data: {
          name: user.name,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

// View user profile
exports.viewUser = [
  userAuth.authenticateToken,
  async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      let user = await userService.getUserByID(authHeader);

      return res.status(200).json({
        status: "success",
        msg: "User details loading..",
        data: {
          name: user.name,
          email: user.email,
          profileImageUrl: user.profileImageUrl,
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

exports.deleteUser = [
  userAuth.authenticateToken,
  async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      // Database will return delete count of data
      const deletedCount = await userService.deleteUser(authHeader);
      const isDeletedUser = deletedCount == 1;

      if (isDeletedUser) {
        return res.status(200).json({
          status: "success",
          msg: "Account deleted successfully",
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

exports.loginUser = [
  userLoginValidator(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json(errors.array());
      }

      let user = await userService.getUserByEmail(req.body.email);

      if (!user) {
        return res.status(404).json([
          {
            status: "error",
            msg: "Email cannot be found!",
          },
        ]);
      }

      // compare user password with hashed password in database
      const validPassword = userAuth.comparePassword(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json([
          {
            status: "error",
            msg: "Invalid Password!",
          },
        ]);
      }

      if (!user.isVerified) {
        return res.status(400).json([
          {
            status: "error",
            msg: "User is not verified, unable to login!",
          },
        ]);
      }

      user = userService.loginUser(user);

      return res.status(200).json({
        token: user.token,
        status: "success",
        msg: "Login successful!",
      });
    } catch (err) {
      return res.status(400).json([
        {
          status: "error",
          msg: err.toString(),
        },
      ]);
    }
  },
];

exports.logout = [
  userAuth.authenticateToken,
  async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      let user = await userService.getUserByID(authHeader);

      userService.logoutUser(user);

      return res.status(200).json({
        status: "success",
        msg: "Have a nice day!",
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];
