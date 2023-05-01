import express from "express";
import { generateReport } from "../controllers/report.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/generate-report", auth, generateReport);
export default router;
