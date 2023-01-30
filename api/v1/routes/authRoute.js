/* eslint-disable import/extensions */
import Express from 'express';
import auth from '../controllers/authController.js';

const router = Express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);

export default router;
