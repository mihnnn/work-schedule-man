import { Router } from "express";
import {
  getEvents,
  getEventsById,
  createEvent,
  deleteEvent,
  updateEvent,
  getPublicEvents,
  getPublicUser,
  getEventBySuffix,
  getPublicEventById,
} from "../controllers/eventController.js";

import {
  getAvailability,
  createAvailability,
  getAvailabilityById,
  updateAvailability,
  deleteAvailability,
} from "../controllers/availabilityController.js";

import {
  cancelBooking,
  createBookings,
  getBookingById,
  getBookings,
  rescheduleBooking,
} from "../controllers/bookingController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { resolveIndexByEventId } from "../middleware/resolveIndexByEventId.js";
import { resolveIndexByAvailId } from "../middleware/resolveIndexByAvailId.js";
import { updateBookingState } from "../middleware/bookingMiddleware.js";
import { resolveIndexByBookingId } from "../middleware/resolveIndexByBookingId.js";

const router = Router();
updateBookingState();

router.get("/api/settings");

// Event routes
router.get("/api/event-types", protectRoute, getEvents);
router.get(
  "/api/event-types/:id",
  protectRoute,
  resolveIndexByEventId,
  getEventsById
);
router.post("/api/event-types", protectRoute, createEvent);
router.patch(
  "/api/event-types/:id",
  protectRoute,
  resolveIndexByEventId,
  updateEvent
);
router.delete(
  "/api/event-types/:id",
  protectRoute,
  resolveIndexByEventId,
  deleteEvent
);

// Public page route
router.get("/api/public-user/:username", getPublicUser);
router.get("/api/public-events/:username/:suffix", getEventBySuffix);
router.get("/api/public-page/:username", getPublicEvents);
router.get("/api/public/event/:id",resolveIndexByEventId, getPublicEventById)

// Bookings routes,
router.get("/api/bookings", protectRoute, getBookings);
router.get(
  "/api/bookings/:id",
  // dont need to protect this route as because it allows non-authenticated users to view the booking
  resolveIndexByBookingId,
  getBookingById
);
router.post("/api/bookings", createBookings);
router.patch(
  "/api/bookings/reschedule/:id",
  resolveIndexByBookingId,
  rescheduleBooking
);
router.patch(
  "/api/bookings/cancel/:id",
  resolveIndexByBookingId,
  cancelBooking
);

// Availability routes
router.get("/api/availability", protectRoute, getAvailability);
router.post("/api/availability", protectRoute, createAvailability);
router.get(
  "/api/availability/:id",
  protectRoute,
  resolveIndexByAvailId,
  getAvailabilityById
);
router.patch(
  "/api/availability/:id",
  protectRoute,
  resolveIndexByAvailId,
  updateAvailability
);
router.delete(
  "/api/availability/:id",
  protectRoute,
  resolveIndexByAvailId,
  deleteAvailability
);

router.get("");

export default router;
