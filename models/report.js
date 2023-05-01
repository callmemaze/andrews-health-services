import mongoose from "mongoose";
import userModel from "./userModel.js";

const reportSchema = mongoose.Schema({
  patientName: { type: String, required: true },
  DOB: { type: Date, required: true },
  age: { type: String, required: true },
  sex: { type: String, required: true },
  symtomps: { type: String },
  prescriptions: { type: String },
  date: { type: Date, required: true, default: Date.now() },
  user: { type: String, required: true },
});

export default mongoose.model("report", reportSchema);
