import express from "express";
import { generateReport, createReport } from "../controllers/report.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/generate-report", auth, generateReport);
router.post("/create-report", auth, createReport);
export default router;
