import express from "express";
import findFriendController from "../controllers/findfriendController.js";

const router = express.Router();

// Loopback API to return AWS EC2 health
router.get("/health", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "EC2 Instance is healthy",
  });
});

router.get("/api/findfriend", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "NUSociaLife FindFriend Microservice",
  });
});

router
  .route("/api/findfriend/getAllFindFriendUsers")
  .get(findFriendController.index);

router
  .route("/api/findfriend/clearMatch")
  .post(findFriendController.clearMatch);

router
  .route("/api/findfriend/createMatch")
  .post(findFriendController.createMatch);

export default router;
