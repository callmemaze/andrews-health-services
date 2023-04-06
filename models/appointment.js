import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  department: { type: String, required: true },
  doctorName: { type: String, required: true },
  patientName: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  appointmentDate: { type: Date, default: Date.now() },
  instructions: { type: String, required: false },
  charge: { type: String, default: "1000" },
  userId: { type: String },
});

export default mongoose.model("appointment", appointmentSchema);
