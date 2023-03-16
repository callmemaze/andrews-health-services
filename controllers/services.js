import mongoose from "mongoose";
import servicesModel from "../models/services.js";

export const getServices = async (req, res) => {
  try {
    const services = await servicesModel.find();
    res.status(200).json({ services });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
