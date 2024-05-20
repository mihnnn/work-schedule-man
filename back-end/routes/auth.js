import { Router } from 'express';
import { signup, login, logout  } from '../controllers/authController.js'
const router = Router();

router.post('/api/auth/signup', signup);

router.post('/api/auth/login', login);

router.post('/api/auth/logout', logout);

export default router;