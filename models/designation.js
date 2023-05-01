import mongoose from "mongoose";

const designationSchema = mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model("designation", designationSchema);
