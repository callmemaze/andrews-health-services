import mongoose from "mongoose";

const UploadedFile = new mongoose.Schema({
  path: String,
  type: String,
  size: Number,
  folder: String,
  filename: String,
});

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  timing: { type: String, required: true },
  education: { type: String, required: true },
  availability: { type: Boolean, default: true },
  uploadedFile: UploadedFile,
});

export default mongoose.model("doctor", doctorSchema);
