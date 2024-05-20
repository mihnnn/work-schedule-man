import { Router } from 'express';
import { getEvents, createEvent } from '../controllers/appController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = Router();

router.get('/api/settings');


router.get('/api/event', protectRoute,  getEvents);

//wsm.com/event-tyoes will be the first default app page
//:id is a parameter
router.post('/api/event/create/', protectRoute, createEvent);

export default router;