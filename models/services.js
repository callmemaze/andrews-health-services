import mongoose from "mongoose";

const UploadedFile = new mongoose.Schema({
  path: String,
  type: String,
  size: Number,
  folder: String,
  filename: String,
});

const servicesSchema = mongoose.Schema({
  serviceName: { type: String, required: true },
  description: { type: String, required: true },
  uploadedFile: UploadedFile,
});

export default mongoose.model("service", servicesSchema);
