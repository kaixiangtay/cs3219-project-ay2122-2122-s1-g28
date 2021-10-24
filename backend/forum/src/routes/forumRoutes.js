var router = require('express').Router();
var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'NUSociaLife Forum Microservices',
    });
});

router.route('/api/forum/viewAllPosts/:topic')
    .get(postController.index)

router.route('/api/forum/viewUserPosts')
    .get(postController.viewUserPosts)

router.route('/api/forum/createPost')
    .post(postController.createPost)

router.route('/api/forum/viewPost/:post_id')
    .get(postController.viewPost)

router.route('/api/forum/updatePost/:post_id')
    .put(postController.updatePost)

router.route('/api/forum/upvotePost/:post_id')
    .patch(postController.upvotePost)

router.route('/api/forum/downvotePost/:post_id')
    .patch(postController.downvotePost)

router.route('/api/forum/deletePost/:post_id')
    .delete(postController.deletePost)

router.route('/api/forum/viewAllComments/:post_id')
    .get(commentController.viewPostComments)

router.route('/api/forum/viewUserComments')
    .get(commentController.viewUserComments)

router.route('/api/forum/createComment/:post_id')
    .post(commentController.createComment)

router.route('/api/forum/viewComment/:post_id/:comment_id')
    .get(commentController.viewComment)

router.route('/api/forum/updateComment/:post_id/:comment_id')
    .patch(commentController.updateComment)

router.route('/api/forum/upvoteComment/:post_id/:comment_id')
    .patch(commentController.upvoteComment)

router.route('/api/forum/downvoteComment/:post_id/:comment_id')
    .patch(commentController.downvoteComment)

router.route('/api/forum/deleteComment/:post_id/:comment_id')
    .delete(commentController.deleteComment)

router.route('/api/forum/sortPostByAscVotes/:topic')
    .get(postController.sortPostByAscVotes)

router.route('/api/forum/sortPostByDescVotes/:topic')
    .get(postController.sortPostByDescVotes)

router.route('/api/forum/sortPostByAscDate/:topic')
    .get(postController.sortPostByAscDate) 

router.route('/api/forum/sortPostByDescDate/:topic')
    .get(postController.sortPostByDescDate) 

router.route('/api/forum/sortCommentsByAscVotes/:post_id')
    .get(commentController.sortCommentsByAscVotes)

router.route('/api/forum/sortCommentsByDescVotes/:post_id')
    .get(commentController.sortCommentsByDescVotes)

router.route('/api/forum/sortCommentsByAscDate/:post_id')
    .get(commentController.sortCommentsByAscDate)

router.route('/api/forum/sortCommentsByDescDate/:post_id')
    .get(commentController.sortCommentsByDescDate)

module.exports = router; 

