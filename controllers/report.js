import mongoose from "mongoose";
import reportModel from "../models/report.js";

export const generateReport = async (req, res) => {
  try {
    const report = await reportModel
      .find({ user: req.userId })
      .sort({ _id: -1 });
    res.status(200).json({ report });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
