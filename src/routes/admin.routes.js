import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import {
  viewAllUsers,
  viewUserById,
  updateUserStatus,
} from "../controllers/admin.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { userStatusSchema } from "../validators/user-status.schema.js";

const router = express.Router();

router.get("/view-all", protect, isAdmin, viewAllUsers);

router.get("/view-user/:id", protect, isAdmin, viewUserById);

router.put(
  "/update-status/:id",
  protect,
  isAdmin,
  validate(userStatusSchema),
  updateUserStatus
);

export default router;
