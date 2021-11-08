import { validationResult } from "express-validator";
import userValidator from "../middlewares/userValidator.js";
import { S3_BUCKET_NAME } from "../config/config.js";
import userAuth from "../middlewares/userAuth.js";
import userService from "../services/userService.js";
import { uploadImage } from "../services/imageService.js";

const index = [
  async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      const emptyUserDatabase = users.length === 0;

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
  },
];

// Register new user
const registerUser = [
  userValidator.userRegisterValidator(),
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
        user = await userService.createUser(req.body);

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

// Resend verification email
const resendEmail = [
  async (req, res) => {
    try {
      const userEmail = req.body.email;
      const user = await userService.getUserByEmail(userEmail);

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

      await userService.resendEmail(user);

      return res.status(200).json({
        status: "success",
        msg: "New account sign up email link have been resend!",
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

// API to verify user email from email link
const verifyUserEmail = [
  userAuth.decodeTempToken,
  async (req, res) => {
    try {
      const userEmail = req.email;
      let user = await userService.getUserByEmail(req.email);

      if (userEmail !== user.email) {
        return res.status(404).json({
          status: "error",
          msg: "Link has expired!",
        });
      }

      user = await userService.verifyUser(user);

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
  },
];

// Send email for user to reset password
const resetPassword = [
  async (req, res) => {
    try {
      const user = await userService.getUserByEmail(req.body.email);

      if (!user) {
        return res.status(404).json({
          status: "error",
          msg: "Invalid email detected!",
        });
      } else {
        await userService.resetPassword(user);

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
  },
];

// Upload Image into AWS S3 bucket
const uploadProfileImage = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      let user = await userService.getUserByID(userId);

      // frontend file name put to profileImage
      const uploadSingleImage = uploadImage(S3_BUCKET_NAME, user._id).single(
        "profileImage"
      );

      uploadSingleImage(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            status: "error",
            msg: err.toString(),
          });
        } else if (req.file === undefined) {
          return res.status(400).json({
            status: "error",
            msg: "File cannot be found!",
          });
        } else {
          user = await userService.saveProfileImageUrl(user, req.file.location);

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
const updateUser = [
  userAuth.decodeAuthToken,
  userValidator.userUpdateValidator(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json(errors.array());
      }

      const userId = req.userId;
      const user = await userService.updateUser(userId, req.body);

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
const viewUser = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const user = await userService.getUserByID(userId);

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

const deleteUser = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      // Database will return delete count of data
      const deletedCount = await userService.deleteUser(userId);
      const isDeletedUser = deletedCount === 1;

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

const loginUser = [
  userValidator.userLoginValidator(),
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

      user = await userService.loginUser(user);

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

const logoutUser = [
  userAuth.decodeAuthToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const user = await userService.getUserByID(userId);

      await userService.logoutUser(user);

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

export default {
  index,
  registerUser,
  resendEmail,
  verifyUserEmail,
  resetPassword,
  uploadProfileImage,
  updateUser,
  viewUser,
  deleteUser,
  loginUser,
  logoutUser,
};
