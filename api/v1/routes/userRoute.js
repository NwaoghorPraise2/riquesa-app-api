const router = require('express').Router();
const {userController} = require('../controllers/index');

router
   .route('/')
   .post(userController.confirmPassword, userController.createUser)
   .get(userController.getAllUsers);

module.exports = router;
