import { Router } from "express";
import localAuthRoutes from "./localAuth.js";
import googleAuthRoutes from "./googleAuth.js";
import apiRoutes from "./api/index.js";

const router = Router();

router.use("/auth", localAuthRoutes);
router.use("/auth", googleAuthRoutes);
router.use("/api",apiRoutes);
//fallback route
router.use("/api", (req, res) => {
    res.status(404).json({ message: "No route" });
})

export default router;
