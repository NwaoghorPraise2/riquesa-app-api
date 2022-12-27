const router = require('express').Router();
const {userController} = require('../controllers/index');

router.route('/user').post(userController.createUser);

module.exports = router;
