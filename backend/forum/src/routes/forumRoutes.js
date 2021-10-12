var router = require('express').Router();
var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'NUSociaLife Forum Microservices',
    });
});

router.route('/api/posts')
    .get(postController.index)
    .post(postController.createPost)

router.route('/api/posts/:post_id')
    .get(postController.viewPost)
    .put(postController.updatePost)
    .delete(postController.deletePost)

router.route('/api/posts/:post_id/comments')
    .get(commentController.viewPostComments)
    .post(commentController.createComment)

router.route('/api/posts/:post_id/:comment_id')
    .get(commentController.viewComment)
    .put(commentController.updateComment)
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

