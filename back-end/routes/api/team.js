import { Router } from "express";
import {
  assignRole,
  createRole,
  createTeam,
  deleteRole,
  deleteTeam,
  getTeamInfo,
  getTeamMembers,
  joinTeam,
  updateManager,
  updateTeam,
} from "../../controllers/teamController.js";
import { verifyToken } from "../../utils/protectedRoute.js";

const router = Router();

// /api/teams/*
router.post("/create-team", verifyToken, createTeam);
router.get("/:id", verifyToken, getTeamInfo);
router.post("/join-team", verifyToken, joinTeam);
router.patch("/:id", verifyToken, updateTeam);
router.delete("/:id", verifyToken, deleteTeam);

router.post("/:id/roles", verifyToken, createRole);
router.delete("/:id/roles/:roleId", verifyToken, deleteRole);
router.post("/:id/assign-role", verifyToken, assignRole);

router.get("/members/:id", verifyToken, getTeamMembers);

router.patch("/:id/managers", verifyToken, updateManager);

export default router;
