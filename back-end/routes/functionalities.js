import { Router } from 'express';
import { getEvents, createEvent } from '../controllers/appController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = Router();

router.get('/api/settings');


router.get('/api/event-types', protectRoute, getEvents);

//wsm.com/event-tyoes will be the first default app page
//:id is a parameter
router.post('/api/event-types/', protectRoute, createEvent);

export default router;