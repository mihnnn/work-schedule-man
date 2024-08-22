import { Router } from "express";

import usersRoutes from "./users.js";
import eventsRoutes from "./event.js";
import bookingsRoutes from "./booking.js";
import availabilityRoutes from "./availability.js";

// import { publicPageRoutes } from "./publicPage.js";
import {
  getPublicEvents,
  getPublicUser,
  getEventBySuffix,
  getPublicEventById,
} from "../../controllers/eventController.js";

import { updateBookingState } from "../../middleware/bookingMiddleware.js";
import { resolveIndexByEventId } from "../../middleware/resolveIndexByEventId.js";

const router = Router();
updateBookingState();

router.use("/users", usersRoutes);
router.use("/event-types", eventsRoutes);
router.use("/bookings", bookingsRoutes);
router.use("/availability", availabilityRoutes);


// Public page route
router.get("/public-user/:username", getPublicUser);
router.get("/public-events/:username/:suffix", getEventBySuffix);
router.get("/public-page/:username", getPublicEvents);
router.get("/public/event/:id", resolveIndexByEventId, getPublicEventById);



router.get("");

export default router;
