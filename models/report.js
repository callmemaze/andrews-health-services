import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  patientName: { type: String, required: true },
  DOB: { type: Date, required: true },
  age: { type: String, required: true },
  sex: { type: String, required: true },
  symtomps: { type: String },
  prescriptions: { type: String },
});

export default mongoose.model("report", reportSchema);
