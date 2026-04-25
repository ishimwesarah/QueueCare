// routes/appointments.js
import express from "express";
import Appointment from "../models/Appointment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create appointment
router.post("/", auth, async (req, res) => {
  const { doctor, date, reason } = req.body;
  if (!doctor || !date || !reason) return res.status(400).json({ error: "Missing fields" });

  const appointmentDate = new Date(date);
  if (appointmentDate < new Date()) return res.status(400).json({ error: "Cannot book in the past" });

  // Prevent duplicate booking same day
  const existing = await Appointment.findOne({
    patient: req.user.id,
    date: { $gte: new Date(appointmentDate.setHours(0,0,0)), $lt: new Date(appointmentDate.setHours(23,59,59)) },
    status: "booked"
  });
  if (existing) return res.status(400).json({ error: "Duplicate booking on same day" });

  // Assign queue number (count + 1 for today)
  const todayCount = await Appointment.countDocuments({
    date: { $gte: new Date().setHours(0,0,0), $lt: new Date().setHours(23,59,59) }
  });
  const queueNumber = todayCount + 1;

  const appointment = await Appointment.create({
    patient: req.user.id,
    doctor,
    date,
    reason,
    queueNumber
  });

  res.status(201).json(appointment);
});

// Get all appointments
router.get("/", auth, async (req, res) => {
  const filter = req.user.role === "patient" ? { patient: req.user.id } : {};
  const appointments = await Appointment.find(filter).populate("patient", "name email");
  res.json(appointments);
});

// Get single appointment
router.get("/:id", auth, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate("patient", "name email");
  if (!appointment) return res.status(404).json({ error: "Not found" });

  if (req.user.role === "patient" && appointment.patient._id.toString() !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  res.json(appointment);
});

// Update appointment
router.put("/:id", auth, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ error: "Not found" });

  if (req.user.role === "patient" && appointment.patient.toString() !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.body.date && new Date(req.body.date) < new Date()) {
    return res.status(400).json({ error: "Cannot reschedule to past" });
  }

  Object.assign(appointment, req.body);
  await appointment.save();
  res.json(appointment);
});

// Cancel appointment
router.delete("/:id", auth, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ error: "Not found" });

  if (req.user.role === "patient" && appointment.patient.toString() !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (appointment.status === "cancelled") {
    return res.json({ message: "Already cancelled" });
  }

  appointment.status = "cancelled";
  await appointment.save();
  res.json({ message: "Cancelled", appointment });
});

// Mark served (staff/admin only)
router.put("/:id/serve", auth, async (req, res) => {
  if (req.user.role === "patient") return res.status(403).json({ error: "Forbidden" });

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ error: "Not found" });

  if (appointment.status === "served") {
    return res.json({ message: "Already served" });
  }

  appointment.status = "served";
  await appointment.save();
  res.json({ message: "Marked as served", appointment });
});

// Today's queue
router.get("/queue/today", auth, async (req, res) => {
  const todayStart = new Date().setHours(0,0,0);
  const todayEnd = new Date().setHours(23,59,59);
  const queue = await Appointment.find({
    date: { $gte: todayStart, $lt: todayEnd },
    status: "booked"
  }).sort("queueNumber");
  res.json(queue);
});

export default router;
