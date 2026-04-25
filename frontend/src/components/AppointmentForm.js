import { useState } from "react";
import { createAppointment } from "../api/appointments.js";

export default function AppointmentForm({ token }) {
  const [form, setForm] = useState({ doctor: "", date: "", reason: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await createAppointment(token, form);
    alert(JSON.stringify(result));
  }

  return (
    <form onSubmit={handleSubmit} data-testid="appointment-form">
  <input data-testid="appointment-doctor" placeholder="Doctor"
         onChange={e => setForm({ ...form, doctor: e.target.value })} />
  <input data-testid="appointment-date" type="datetime-local"
         onChange={e => setForm({ ...form, date: e.target.value })} />
  <input data-testid="appointment-reason" placeholder="Reason"
         onChange={e => setForm({ ...form, reason: e.target.value })} />
  <button data-testid="appointment-submit" type="submit">Book Appointment</button>
</form>

  );
}
