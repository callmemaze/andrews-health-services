import mongoose from "mongoose";

const servicesSchema = mongoose.Schema({
  serviceName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Buffer, required: true },
});

export default mongoose.model("service", servicesSchema);
