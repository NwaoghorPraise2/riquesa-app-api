import Express from 'express';
import userController from '../controllers/userController.js';

const router = Express.Router();

router
   .route('/')
   .post(userController.confirmPassword, userController.createUser)
   .get(userController.getAllUsers);

export default router;
