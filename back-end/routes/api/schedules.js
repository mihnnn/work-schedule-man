import { Router } from 'express';
import { createSchedule, getAllSchedules } from '../../controllers/schedulesController.js';
import { verifyToken } from '../../utils/protectedRoute.js';

const router = Router();


// /api/schedules/*
router.get('/', verifyToken, getAllSchedules);
router.post('/', verifyToken, createSchedule);

export default router;