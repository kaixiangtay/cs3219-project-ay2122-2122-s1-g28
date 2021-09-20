var router = require('express').Router();
var userController = require('../controllers/userController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'NUSociaLife',
    });
});

router.route('/users')
    .get(userController.index)
    .post(userController.registerUser)

router.route('/users/:user_id')
    .get(userController.viewAllUsers)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router; 

