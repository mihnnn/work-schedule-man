import { Router } from "express";
// import passport from "passport";
import { googleLogin } from "../controllers/authController.js";

const router = Router();

router.post(
  "/google", // "/auth/google"
  // passport.authenticate("google")
  googleLogin
);
// router.get(
//   "/google/callback", // "/auth/google/callback"
//   // passport.authenticate("google", { failureRedirect: "/", session: false }),
//   googleLogin
// );

export default router;
