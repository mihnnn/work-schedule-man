import { Router } from 'express';
import { createSchedule, deleteSchedule, getAllSchedules, updateSchedule } from '../../controllers/schedulesController.js';
import { verifyToken } from '../../utils/protectedRoute.js';

const router = Router();

// /api/schedules/*
router.get('/:id', verifyToken, getAllSchedules);
router.post('/', verifyToken, createSchedule);

router.patch('/:id', verifyToken, updateSchedule);
router.delete('/:id', verifyToken, deleteSchedule);


export default router;