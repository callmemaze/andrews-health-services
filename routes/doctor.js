import express from "express";
import {
  getDoctor,
  getFavorite,
  searchDesignation,
  favoriteDoctor,
} from "../controllers/doctor.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getDoctor);
router.post("/search-designation", auth, searchDesignation);
router.get("/favourite", auth, getFavorite);
router.post("/favourite-doctor", auth, favoriteDoctor);
export default router;
