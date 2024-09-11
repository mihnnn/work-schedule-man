import { Router } from 'express';
import { finishBoarding, getUserById, updateOnboardProfile } from '../../controllers/userController.js';
import { verifyToken } from '../../utils/protectedRoute.js';

const router = Router();

// /api/users/*

// router.get('/user',verifyToken ,getOneUser)
router.get('/user/:id',verifyToken ,getUserById)
router.patch('/user/:id',verifyToken,updateOnboardProfile) //update user profile in onboarding step

router.patch('/onboarding/:id',verifyToken,finishBoarding)


export default router;