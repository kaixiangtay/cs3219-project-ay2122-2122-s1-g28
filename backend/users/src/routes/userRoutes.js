var router = require("express").Router();
var userController = require("../controllers/userController");

router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "NUSociaLife User Microservices",
  });
});

router.route("/api/users/login").post(userController.loginUser);

router.route("/api/users/signup").post(userController.registerUser);

router.route("/api/users/logout").post(userController.logout);

router.route("/api/users/getAllUsers").get(userController.index);

router.route("/api/users/getUser").get(userController.viewUser);

router
  .route("/api/users/verifyEmail/:token")
  .get(userController.verifyUserEmail);

router
  .route("/api/users/resendActivationEmail")
  .post(userController.resendActivationEmail);

router
  .route("/api/users/resetPassword")
  .post(userController.sendResetPasswordEmail);

router
  .route("/api/users/resetPassword/:token")
  .patch(userController.resetPassword);

router.route("/api/users/update").patch(userController.updateUser);

router.route("/api/users/uploadProfileImage").post(userController.uploadProfileImage);

router.route("/api/users/viewProfileImage").get(userController.viewProfileImage);

router.route("/api/users/delete").delete(userController.deleteUser);

module.exports = router;
