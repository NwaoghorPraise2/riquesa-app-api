const router = require('express').Router();
const {userController} = require('../controllers/index');

router.route('/user').get(userController.greet).post();

module.exports = router;
