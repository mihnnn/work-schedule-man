import { Router } from 'express';
import { verifyToken } from '../../utils/protectedRoute.js';
import { createRequest, getAllRequests } from '../../controllers/requestController.js';

const router = Router();


// /api/schedules/*
router.get('/:id', verifyToken, getAllRequests);
router.post('/', verifyToken, createRequest);

export default router;