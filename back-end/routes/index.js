import { Router } from 'express';
import authRouter from './auth.js';
import appRouter from './functionalities.js';

const router = Router();

router.use(authRouter);
router.use(appRouter);

export default router;