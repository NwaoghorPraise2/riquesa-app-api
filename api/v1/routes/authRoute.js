/* eslint-disable import/extensions */
import Express from 'express';
import authController from '../controllers/authController.js';

const router = Express.Router();

router.post('/signup', authController.signup);

export default router;
