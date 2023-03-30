import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  timing: { type: String, required: true },
  education: { type: String, required: true },
  availability: { type: Boolean, default: true },
  profileImage: { type: String, required: false },
});

export default mongoose.model("doctor", doctorSchema);
