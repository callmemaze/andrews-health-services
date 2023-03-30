import express from "express";
import {
  getPharmacy,
  serachPharmacyMedicine,
} from "../controllers/pharmacy.js";
const router = express.Router();
router.get("/", getPharmacy);
router.get("/search-medicine", serachPharmacyMedicine);
export default router;
