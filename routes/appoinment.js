import express from "express";
import {
  getAppointment,
  createAppointment,
} from "../controllers/appointment.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAppointment);
router.post("/create-appointment", auth, createAppointment);
export default router;
