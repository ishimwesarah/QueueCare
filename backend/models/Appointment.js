// models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  queueNumber: { type: Number },
  status: { type: String, enum: ["booked", "served", "cancelled"], default: "booked" }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
