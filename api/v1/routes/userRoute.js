const router = require('express').Router();
const {greet} = require('../controllers/userController');

router
    .route('/user') 
    .get(greet)
    .post();


module.exports = router;