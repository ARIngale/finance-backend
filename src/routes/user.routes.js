import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  toggleUserStatus,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createUser);
router.get("/", protect, authorizeRoles("admin"), getUsers);
router.put("/:id", protect, authorizeRoles("admin"), updateUser);
router.patch("/:id/status", protect, authorizeRoles("admin"), toggleUserStatus);

export default router;