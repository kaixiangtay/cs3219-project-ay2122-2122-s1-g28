const router = require("express").Router();
const findFriendController = require("../controllers/findFriendController");

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
