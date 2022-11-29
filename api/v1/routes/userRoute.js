const router = require('express').Router();
const controller = require('../controllers/userController');

router
    .route('/') 
    .get(controller.getUsers)
    .post(controller.createUser);


module.exports = router;