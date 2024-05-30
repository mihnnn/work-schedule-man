import { Router } from 'express';
import { getEvents, createEvent, deleteEvent } from '../controllers/eventController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = Router();

router.get('/api/settings');


router.get('/api/event-types', protectRoute, getEvents);

//wsm.com/event-tyoes will be the first default app page
//:id is a parameter
router.post('/api/event-types', protectRoute, createEvent);

router.delete('/api/event-types/:id', protectRoute, deleteEvent);

export default router;