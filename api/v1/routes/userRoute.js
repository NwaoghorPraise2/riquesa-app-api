/* eslint-disable import/extensions */
import Express from 'express';
import userController from '../controllers/userController.js';

const router = Express.Router();

// router
router.route('/').get(userController.getAllUsers);

export default router;
