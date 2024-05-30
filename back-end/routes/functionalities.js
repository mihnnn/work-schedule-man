import { Router } from "express";
import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { resolveIndexByEventId } from "../middleware/resolveIndexByEventId.js";

const router = Router();

router.get("/api/settings");
router.get("/api/event-types", protectRoute, getEvents);
router.delete(
  "/api/event-types/:id",
  protectRoute,
  resolveIndexByEventId,
  deleteEvent
);
router.post("/api/event-types", protectRoute, createEvent);

export default router;
