import { Router } from "express";
import {
  getEvents,
  getEventsById,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../../controllers/eventController.js";
// import { protectRoute } from "../../middleware/protectRoute.js";
import { resolveIndexByEventId } from "../../middleware/resolveIndexByEventId.js";
import { verifyToken } from "../../utils/protectedRoute.js";

const router = Router();

// Event routes
router.get("/", verifyToken, getEvents);
router.get("/:id", verifyToken, resolveIndexByEventId, getEventsById);
router.post("/", verifyToken, createEvent);
router.patch("/:id", verifyToken, resolveIndexByEventId, updateEvent);
router.delete("/:id", verifyToken, resolveIndexByEventId, deleteEvent);

export default router;
