import express from "express";
import {
  signin,
  signup,
  forgotPassword,
  verifyResetPassword,
  resetPassword,
} from "../controllers/user.js";
const router = express.Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyResetPassword);
router.post("/reset-password", resetPassword);
export default router;
