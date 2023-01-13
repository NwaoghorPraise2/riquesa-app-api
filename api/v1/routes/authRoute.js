/* eslint-disable import/extensions */
import Express from 'express';
import authController from '../controllers/authController.js';

const router = Express.Router();

router.post('/signup', authController.signup);

// router
//    .route('/')
//    .post(userController.confirmPassword, userController.createUser)
//    .get(userController.getAllUsers);

export default router;
