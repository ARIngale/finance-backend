import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import { createRecordValidation } from "../validations/record.validation.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

// Create record (Admin only + validation)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createRecordValidation,
  validate,
  createRecord
);

// Get records (Admin + Analyst)
router.get("/", protect, authorizeRoles("admin", "analyst"), getRecords);

// Update record (Admin only)
router.put("/:id", protect, authorizeRoles("admin"), updateRecord);

// Delete record (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteRecord);

export default router;