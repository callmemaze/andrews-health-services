import mongoose from "mongoose";

const feebackSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model("feedback", feebackSchema);
