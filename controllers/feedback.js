import mongoose from "mongoose";
import feedbackModel from "../models/feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const feedback = req.body;
    const newFeedback = new feedbackModel(feedback);
    await newFeedback.save();
    res.status(201).json({ newFeedback });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
