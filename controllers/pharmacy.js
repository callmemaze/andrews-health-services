import mongoose from "mongoose";
import pharmacyModel from "../models/pharmacy.js";

export const getPharmacy = async (req, res) => {
  try {
    const pharmacy = await pharmacyModel.find();
    res.status(200).json({ pharmacy });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const serachPharmacyMedicine = async (req, res) => {
  try {
    const { medicine } = req.body;
    const pharmacy = await pharmacyModel.find({ medicineName: medicine });
    res.status(200).json({ pharmacy });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
