import { Router } from "express";
import {
  getAvailability,
  createAvailability,
  getAvailabilityById,
  updateAvailability,
  deleteAvailability,
  onboardAvailability,
} from "../../controllers/availabilityController.js";
import { resolveIndexByAvailId } from "../../middleware/resolveIndexByAvailId.js";
import { verifyToken } from "../../utils/protectedRoute.js";


const router = Router();

// Availability routes
router.get("/", verifyToken, getAvailability);
router.post("/", verifyToken, createAvailability);
router.post("/onboard", verifyToken, onboardAvailability);
router.get(
  "/:id",
  verifyToken,
  resolveIndexByAvailId,
  getAvailabilityById
);
router.patch(
  "/:id",
  verifyToken,
  resolveIndexByAvailId,
  updateAvailability
);
router.delete(
  "/:id",
  verifyToken,
  resolveIndexByAvailId,
  deleteAvailability
);

export default router;
