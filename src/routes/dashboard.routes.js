import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("admin", "analyst", "viewer"),
  getDashboard
);

export default router;