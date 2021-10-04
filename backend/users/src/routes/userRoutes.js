var router = require('express').Router();
var userController = require('../controllers/userController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'NUSociaLife',
    });
});

router.route('/api/users/login')
    .post(userController.loginUser)

router.route('/api/users/signup')
    .post(userController.registerUser)

router.route('/api/users')
    .get(userController.index)

router.route('/api/users/:user_id')
    .get(userController.viewUser)

router.route('/api/users/update/:user_id')
    .patch(userController.updateUser)

router.route('/api/users/delete/:user_id')
    .delete(userController.deleteUser)

module.exports = router; 

