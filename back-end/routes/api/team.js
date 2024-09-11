import { Router } from 'express';
import { createTeam, joinTeam } from '../../controllers/teamController.js';
import { verifyToken } from '../../utils/protectedRoute.js';

const router = Router();

// /api/teams/*
router.post('/create-team', verifyToken, createTeam);
router.post('/join-team', verifyToken, joinTeam);



export default router;