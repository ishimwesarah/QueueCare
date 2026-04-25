// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import appointmentRoutes from "./routes/appointments.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",   
  credentials: true                  
}));

// Middleware
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
  res.send("QueueCare API is running...");
});
// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
