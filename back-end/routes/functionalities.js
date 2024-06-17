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
  createAvailability,
  getAvailabilityById,
  updateAvailability,
  deleteAvailability

} from "../controllers/availabilityController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { resolveIndexByEventId } from "../middleware/resolveIndexByEventId.js";
import { resolveIndexByAvailId } from "../middleware/resolveIndexByAvailId.js";

const router = Router();

router.get("/api/settings");

// Event routes
router.get("/api/event-types", protectRoute, getEvents);
router.get("/api/event-types/:id",protectRoute, resolveIndexByEventId, getEventsById);
router.post("/api/event-types", protectRoute, createEvent);
router.patch("/api/event-types/:id", protectRoute, resolveIndexByEventId, updateEvent);
router.delete("/api/event-types/:id", protectRoute, resolveIndexByEventId, deleteEvent);

// Public page route
router.get("/api/public-events/:username", getPublicEvents);
router.get("/api/public-user/:username", getPublicUser);

// Availability routes
router.get("/api/availability", protectRoute, getAvailability);
router.post("/api/availability",protectRoute, createAvailability);
router.get("/api/availability/:id", protectRoute,resolveIndexByAvailId, getAvailabilityById);
router.patch("/api/availability/:id", protectRoute, resolveIndexByAvailId, updateAvailability);
router.delete("/api/availability/:id", protectRoute, resolveIndexByAvailId, deleteAvailability);

router.get("")

export default router;
