import mongoose from "mongoose";
import appointmentModel from "../models/appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    const user = req.userId;
    const newAppointment = new appointmentModel({
      ...appointment,
      userId: user,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({ userId: req.userId });
    res.status(201).json({ appointment });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
