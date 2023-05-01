import designationModel from "../models/designation.js";

export const getDesignation = async (req, res) => {
  try {
    const designation = await designationModel.find();
    res.status(201).json({ designation });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
