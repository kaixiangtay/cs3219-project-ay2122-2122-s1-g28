var router = require('express').Router();
var findFriendController = require('../controllers/findFriendController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'FindFriend MS',
    });
});

router.route('/api/findFriend')
    .get(findFriendController.index)

router.route('/api/findFriend/setMatch')
    .post(findFriendController.setMatch)

router.route('/api/findFriend/randomMatch')
    .post(findFriendController.randomMatch)

router.route('/api/findFriend/clearMatch')
    .post(findFriendController.clearMatch)

module.exports = router; 
