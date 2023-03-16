import mongoose from "mongoose";
import doctorModel from "../models/doctor.js";

export const getDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const searchDesignation = async (req, res) => {
  try {
    const designation = req.body;
    const doctors = await doctorModel.find({ designation: designation });
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFavorite = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    const id = [];
    const fav = [];

    doctors.map(async (j) => {
      if (j.favorites.includes(req.userId)) {
        id.push(j._id);
      }
    });
    const records = await doctorModel.find({ _id: { $in: id } });
    res.status(200).json({ records });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const favoriteDoctor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const isFav = await doctorModel.findById(id);
  if (isFav.favorites.includes(req.userId)) {
    await doctorModel
      .findByIdAndUpdate(
        id,
        {
          $pull: { favorites: req.userId },
        },
        {
          new: true,
        }
      )
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  } else {
    await doctorModel
      .findByIdAndUpdate(
        id,
        {
          $push: { favorites: req.userId },
        },
        {
          new: true,
        }
      )
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  }
};
