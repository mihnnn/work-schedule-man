import { Router } from 'express';
import { verifyToken } from '../../utils/protectedRoute.js';
import { createMeeting, getAllMeetings, updateMeeting } from '../../controllers/meetingController.js';

const router = Router();

// /api/meetings/*
router.get('/:id', verifyToken, getAllMeetings);
router.post('/', verifyToken, createMeeting);
router.patch('/:id', verifyToken, updateMeeting);
export default router;
