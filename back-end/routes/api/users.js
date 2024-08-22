import { Router } from 'express';
import { user } from '../../controllers/userController.js';
import { verifyToken } from '../../utils/protectedRoute.js';

const router = Router();

router.get('/user',verifyToken ,user)

export default router;