import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/user.schema.js";
import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getCurrentUser);
router.put(
  "/update-profile",
  protect,
  validate(updateProfileSchema),
  updateProfile
);
router.put(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  changePassword
);

export default router;
