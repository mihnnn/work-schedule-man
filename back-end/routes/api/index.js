import { Router } from "express";

import usersRoutes from "./users.js";
import teamRoutes from "./team.js";
import availabilityRoutes from "./availability.js";
import schedulesRoutes from "./schedules.js";
import meetingsRoutes from "./meetings.js";
import requestsRoutes from "./requests.js";
import activitiesRoutes from "./activityLog.js";

// unused routes:
// import eventsRoutes from "./event.js";
// import bookingsRoutes from "./booking.js";
// import { publicPageRoutes } from "./publicPage.js";
// import {
//   getPublicEvents,
//   getPublicUser,
//   getEventBySuffix,
//   getPublicEventById,
// } from "../../controllers/eventController.js";

// import { updateBookingState } from "../../middleware/bookingMiddleware.js";
// import { resolveIndexByEventId } from "../../middleware/resolveIndexByEventId.js";

const router = Router();
// updateBookingState();

router.use("/users", usersRoutes);
router.use("/teams", teamRoutes);
router.use("/schedules", schedulesRoutes);
router.use("/meetings", meetingsRoutes);
router.use("/requests", requestsRoutes);
router.use("/activity-log", activitiesRoutes);

router.use("/availability", availabilityRoutes);

// unused routes:
// router.use("/event-types", eventsRoutes);
// router.use("/bookings", bookingsRoutes);
// Public page route
// router.get("/public-user/:username", getPublicUser);
// router.get("/public-events/:username/:suffix", getEventBySuffix);
// router.get("/public-page/:username", getPublicEvents);
// router.get("/public/event/:id", resolveIndexByEventId, getPublicEventById);

router.get("");

export default router;
