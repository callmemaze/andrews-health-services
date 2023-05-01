import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import appointmentRoutes from "./routes/appoinment.js";
import pharmacyRoutes from "./routes/pharmacy.js";
import doctorRoutes from "./routes/doctor.js";
import servicesRoutes from "./routes/services.js";
import feedbackRoutes from "./routes/feedback.js";
import newsRoutes from "./routes/news.js";
import reportRoutes from "./routes/report.js";
import designationRoutes from "./routes/designation.js";
dotenv.config();

const app = express();
app.use("/admin", adminRoutes);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
app.use(express.static("components"));
app.use("/api/users/", userRoutes);
app.use("/api/appointment/", appointmentRoutes);
app.use("/api/pharmacy/", pharmacyRoutes);
app.use("/api/doctor/", doctorRoutes);
app.use("/api/services/", servicesRoutes);
app.use("/api/feedback/", feedbackRoutes);
app.use("/api/news/", newsRoutes);
app.use("/api/report/", reportRoutes);
app.use("/api/designation/", designationRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URI = process.env.CONNECTION_URI;

mongoose
  .connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
