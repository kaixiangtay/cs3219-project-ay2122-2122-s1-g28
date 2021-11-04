import express from "express";
import postController from "../controllers/postController.js";
import commentController from "../controllers/commentController.js";

const router = express.Router();

// Loopback API to return AWS EC2 health
router.get("/health", (req, res) => {
	res.json({
		status: "API Its Working",
		message: "EC2 Instance is healthy",
	});
});

router.get("/api/forum", (req, res) => {
	res.json({
		status: "API Its Working",
		message: "NUSociaLife Forum Microservices",
	});
});

router
	.route("/api/forum/viewUserPosts/:topic")
	.get(postController.viewUserPosts);

router.route("/api/forum/createPost").post(postController.createPost);

router.route("/api/forum/viewPost/:post_id").get(postController.viewPost);

router.route("/api/forum/updatePost/:post_id").put(postController.updatePost);

router.route("/api/forum/upvotePost/:post_id").patch(postController.upvotePost);

router
	.route("/api/forum/downvotePost/:post_id")
	.patch(postController.downvotePost);

router
	.route("/api/forum/deletePost/:post_id")
	.delete(postController.deletePost);

router
	.route("/api/forum/viewUserComments/:topic")
	.get(commentController.viewUserComments);

router
	.route("/api/forum/createComment/:post_id")
	.post(commentController.createComment);

router
	.route("/api/forum/updateComment/:post_id/:comment_id")
	.patch(commentController.updateComment);

router
	.route("/api/forum/upvoteComment/:post_id/:comment_id")
	.patch(commentController.upvoteComment);

router
	.route("/api/forum/downvoteComment/:post_id/:comment_id")
	.patch(commentController.downvoteComment);

router
	.route("/api/forum/deleteComment/:post_id/:comment_id")
	.delete(commentController.deleteComment);

router
	.route("/api/forum/sortPostByAscVotes/:topic")
	.get(postController.sortPostByAscVotes);

router
	.route("/api/forum/sortPostByDescVotes/:topic")
	.get(postController.sortPostByDescVotes);

router
	.route("/api/forum/sortPostByAscDate/:topic")
	.get(postController.sortPostByAscDate);

router
	.route("/api/forum/sortPostByDescDate/:topic")
	.get(postController.sortPostByDescDate);

router
	.route("/api/forum/sortCommentsByAscVotes/:post_id")
	.get(commentController.sortCommentsByAscVotes);

router
	.route("/api/forum/sortCommentsByDescVotes/:post_id")
	.get(commentController.sortCommentsByDescVotes);

router
	.route("/api/forum/sortCommentsByAscDate/:post_id")
	.get(commentController.sortCommentsByAscDate);

router
	.route("/api/forum/sortCommentsByDescDate/:post_id")
	.get(commentController.sortCommentsByDescDate);

export default router;
