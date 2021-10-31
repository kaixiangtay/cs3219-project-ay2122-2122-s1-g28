import express from "express";
import findFriendController from "../controllers/findFriendController.js";

const router = express.Router();

// Loopback API to return AWS EC2 health
router.get("/health", (req, res) => {
	res.json({
		status: "API Its Working",
		message: "EC2 Instance is healthy",
	});
});

router.get("/api/findFriend", (req, res) => {
	res.json({
		status: "API Its Working",
		message: "NUSociaLife FindFriend Microservice",
	});
});

router
	.route("/api/findFriend/getAllFindFriendUsers")
	.get(findFriendController.index);

router
	.route("/api/findFriend/clearMatch")
	.post(findFriendController.clearMatch);

router
	.route("/api/findFriend/createMatch")
	.post(findFriendController.createMatch);

export default router;
