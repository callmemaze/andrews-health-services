import express from "express";
import { getServices } from "../controllers/services.js";
const router = express.Router();
router.get("/services", getServices);
export default router;
