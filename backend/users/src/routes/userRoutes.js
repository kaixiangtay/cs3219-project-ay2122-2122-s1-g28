import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Loopback API to return AWS EC2 health
router.get("/health", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "EC2 Instance is healthy",
  });
});

router.get("/api/users", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "NUSociaLife User Microservices",
  });
});

router.route("/api/users/login").post(userController.loginUser);

router.route("/api/users/signup").post(userController.registerUser);

router.route("/api/users/logout").post(userController.logoutUser);

router.route("/api/users/getAllUsers").get(userController.index);

router.route("/api/users/getUser").get(userController.viewUser);

router
  .route("/api/users/verifyEmail/:token")
  .post(userController.verifyUserEmail);

router.route("/api/users/resendEmail").post(userController.resendEmail);

router.route("/api/users/resetPassword").post(userController.resetPassword);

router.route("/api/users/update").patch(userController.updateUser);

router
  .route("/api/users/uploadProfileImage")
  .post(userController.uploadProfileImage);

router.route("/api/users/delete").delete(userController.deleteUser);

export default router;
