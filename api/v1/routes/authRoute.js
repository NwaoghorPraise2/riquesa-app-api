/* eslint-disable import/extensions */
import Express from 'express';
import auth from '../controllers/authController.js';

const router = Express.Router();

router.post('/login', auth.login);
router.post('/signup', auth.signup);

export default router;
