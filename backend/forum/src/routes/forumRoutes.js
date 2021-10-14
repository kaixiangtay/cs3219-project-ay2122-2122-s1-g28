var router = require('express').Router();
var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'NUSociaLife Forum Microservices',
    });
});

router.route('/api/viewAllPosts')
    .get(postController.index)

router.route('/api/createPost')
    .post(postController.createPost)

router.route('/api/viewPost/:post_id')
    .get(postController.viewPost)

router.route('/api/updatePost/:post_id/:user_id')
    .put(postController.updatePost)

router.route('/api/upvotePost/:post_id/:user_id')
    .patch(postController.upvotePost)

router.route('/api/downvotePost/:post_id/:user_id')
    .patch(postController.downvotePost)

router.route('/api/deletePost/:post_id/:user_id')
    .delete(postController.deletePost)

router.route('/api/viewAllComments/:post_id')
    .get(commentController.viewPostComments)

router.route('/api/createComment/:post_id')
    .post(commentController.createComment)

router.route('/api/viewComment/:post_id/:comment_id')
    .get(commentController.viewComment)

router.route('/api/updateComment/:post_id/:comment_id/:user_id')
    .patch(commentController.updateComment)

router.route('/api/upvoteComment/:post_id/:comment_id/:user_id')
    .patch(commentController.upvoteComment)

router.route('/api/downvoteComment/:post_id/:comment_id/:user_id')
    .patch(commentController.downvoteComment)

router.route('/api/deleteComment/:post_id/:comment_id/:user_id')
    .delete(commentController.deleteComment)

router.route('/api/sortPostByAscVotes')
    .get(postController.sortPostByAscVotes)

router.route('/api/sortPostByDescVotes')
    .get(postController.sortPostByDescVotes)

router.route('/api/sortPostByAscDate')
    .get(postController.sortPostByAscDate) 

router.route('/api/sortPostByDescDate')
    .get(postController.sortPostByDescDate) 

router.route('/api/sortCommentsByAscVotes/:post_id')
    .get(commentController.sortCommentsByAscVotes)

router.route('/api/sortCommentsByDescVotes/:post_id')
    .get(commentController.sortCommentsByDescVotes)

module.exports = router; 

