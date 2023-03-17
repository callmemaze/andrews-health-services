import mongoose from "mongoose";

const UploadedFile = new mongoose.Schema({
  path: String,
  type: String,
  size: Number,
  folder: String,
  filename: String,
});

const pharmacySchema = mongoose.Schema({
  medicineName: { type: String, required: true },
  expiryDate: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  uploadedFile: UploadedFile,
});

export default mongoose.model("pharmacy", pharmacySchema);
