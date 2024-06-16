import { Router } from "express";
import {
  getEvents,
  getEventsById,
  createEvent,
  deleteEvent,
  updateEvent,
  getPublicEvents,
  getPublicUser,
} from "../controllers/eventController.js";

import { 
  getAvailability,
  createAvailability

} from "../controllers/availabilityController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { resolveIndexByEventId } from "../middleware/resolveIndexByEventId.js";

const router = Router();

router.get("/api/settings");


router.get("/api/event-types", protectRoute, getEvents);
router.get("/api/event-types/:id",protectRoute, resolveIndexByEventId, getEventsById);
router.post("/api/event-types", protectRoute, createEvent);
router.patch("/api/event-types/:id", protectRoute, resolveIndexByEventId, updateEvent);
router.delete("/api/event-types/:id", protectRoute, resolveIndexByEventId, deleteEvent);

router.get("/api/public-events/:username", getPublicEvents);
router.get("/api/public-user/:username", getPublicUser);

router.get("/api/availability", protectRoute, getAvailability);
router.post("/api/availability",protectRoute, createAvailability);

router.get("")

export default router;
