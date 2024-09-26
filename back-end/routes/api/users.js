import { Router } from 'express';
import { finishBoarding, getTeamMemberships, getUserById, updateOnboardProfile } from '../../controllers/userController.js';
import { verifyToken } from '../../utils/protectedRoute.js';

const router = Router();

// /api/users/*

// router.get('/user',verifyToken ,getOneUser)
router.get('/user/:id',verifyToken ,getUserById)
router.patch('/user/:id',verifyToken,updateOnboardProfile)

router.patch('/onboarding/:id',verifyToken,finishBoarding)

router.get('/user/teams/:id',verifyToken,getTeamMemberships)


export default router;