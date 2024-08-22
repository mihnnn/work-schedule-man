import { Router } from "express";
import {
  cancelBooking,
  createBookings,
  getBookingById,
  getBookings,
  rescheduleBooking,
} from "../../controllers/bookingController.js";
// import { protectRoute } from "../../middleware/protectRoute.js";
import { resolveIndexByBookingId } from "../../middleware/resolveIndexByBookingId.js";
import { verifyToken } from "../../utils/protectedRoute.js";

const router = Router();

router.get("/", verifyToken, getBookings);
router.get("/:id", verifyToken, resolveIndexByBookingId, getBookingById);
router.post("/", verifyToken, createBookings);
router.patch(
  "/reschedule/:id",
  verifyToken,
  resolveIndexByBookingId,
  rescheduleBooking
);
router.patch(
  "/cancel/:id",
  verifyToken,
  resolveIndexByBookingId,
  cancelBooking
);

export default router;
