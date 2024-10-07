import { Router } from 'express';
import { verifyToken } from '../../utils/protectedRoute.js';
import { createActivityLog } from '../../controllers/activityController.js';


const router = Router();

// /api/activity-log/*
router.post("/", verifyToken, createActivityLog);

export default router;