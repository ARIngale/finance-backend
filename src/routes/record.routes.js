import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin only
router.post("/", protect, authorizeRoles("admin"), createRecord);

// Admin + Analyst
router.get("/", protect, authorizeRoles("admin", "analyst"), getRecords);

// Admin only
router.put("/:id", protect, authorizeRoles("admin"), updateRecord);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRecord);

export default router;