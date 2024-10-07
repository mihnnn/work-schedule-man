import { Router } from 'express';
import { verifyToken } from '../../utils/protectedRoute.js';
import { createMeeting, getAllMeetings } from '../../controllers/meetingController.js';

const router = Router();

// /api/meetings/*
router.get('/', verifyToken, getAllMeetings);
router.post('/', verifyToken, createMeeting);

export default router;
