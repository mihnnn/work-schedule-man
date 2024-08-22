import { Router } from 'express';
import { signup, login, logout  } from '../controllers/authController.js'


const router = Router();

router.post('/signup', signup); // /auth/signup

router.post('/login' , login); // /auth/login

router.post('/logout', logout); // /auth/logout

export default router;