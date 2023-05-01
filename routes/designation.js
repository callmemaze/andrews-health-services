import express from "express";
import { getDesignation } from "../controllers/designation.js";
const router = express.Router();
router.get("/", getDesignation);
export default router;
