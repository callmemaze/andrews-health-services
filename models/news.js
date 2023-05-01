import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: String, required: true },
});

export default mongoose.model("news", newsSchema);
