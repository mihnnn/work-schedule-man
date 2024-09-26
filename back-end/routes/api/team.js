 import { Router } from 'express';
import { createTeam, getTeamInfo, joinTeam } from '../../controllers/teamController.js';
import { verifyToken } from '../../utils/protectedRoute.js';

const router = Router();

// /api/teams/*
router.post('/create-team', verifyToken, createTeam);
router.post('/join-team', verifyToken, joinTeam);
router.get('/:id', verifyToken, getTeamInfo);
// router.get('/get-members', verifyToken,)



export default router;