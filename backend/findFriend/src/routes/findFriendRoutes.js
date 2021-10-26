import express from "express";
import findFriendController from "../controllers/findFriendController";

const router = express.Router();

router.get("/", (req, res) => {
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

module.exports = router;
