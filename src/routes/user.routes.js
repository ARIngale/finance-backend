import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  toggleUserStatus,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import { createUserValidation } from "../validations/user.validation.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

// Create user (Admin only + validation)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createUserValidation,
  validate,
  createUser
);

// Get users
router.get("/", protect, authorizeRoles("admin"), getUsers);

// Update user
router.put("/:id", protect, authorizeRoles("admin"), updateUser);

// Toggle status
router.patch("/:id/status", protect, authorizeRoles("admin"), toggleUserStatus);

export default router;