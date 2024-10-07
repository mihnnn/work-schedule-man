import { Router } from 'express';
import { verifyToken } from '../../utils/protectedRoute.js';
import { createRequest } from '../../controllers/requestController.js';

const router = Router();


// /api/schedules/*
router.post('/', verifyToken, createRequest);

export default router;