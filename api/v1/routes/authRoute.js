/* eslint-disable import/extensions */
import Express from 'express';
import {login, signup} from '../controllers/authController.js';

const router = Express.Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;
