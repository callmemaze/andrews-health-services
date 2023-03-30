import mongoose from "mongoose";
import reportModel from "../models/report.js";

export const generateReport = async (req, res) => {
  try {
    const report = await reportModel.find({ userId: req.userId });
    res.status(200).json({ report });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const report = req.body;
    const newReport = new Booking({
      ...report,
      userId: req.userId,
    });
    await newbooking.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
