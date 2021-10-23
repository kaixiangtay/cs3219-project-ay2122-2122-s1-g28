let router = require('express').Router();
let findFriendController = require('../controllers/findFriendController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'NUSociaLife FindFriend Microservice',
    });
});

router.route('/api/findFriend')
    .get(findFriendController.index)
    
router.route('/api/findFriend/clearMatch')
    .post(findFriendController.clearMatch)

router.route('/api/findFriend/createMatch')
    .post(findFriendController.createMatch)

module.exports = router; 
