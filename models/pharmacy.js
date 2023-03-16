import mongoose from "mongoose";

const pharmacySchema = mongoose.Schema({
  medicineName: { type: String, required: true },
  expiryDate: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: Buffer, required: true },
});

export default mongoose.model("pharmacy", pharmacySchema);
