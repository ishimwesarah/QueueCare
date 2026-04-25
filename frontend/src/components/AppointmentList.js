import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments.js";

export default function AppointmentList({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getAppointments(token);
      setAppointments(data);
    }
    fetchData();
  }, [token]);

  const filtered = filterDate
    ? appointments.filter(a => new Date(a.date).toISOString().slice(0,10) === filterDate)
    : appointments;

  return (
    <div>
      <h2>Appointments</h2>
      <input
        type="date"
        data-testid="filter-date"
        value={filterDate}
        onChange={e => setFilterDate(e.target.value)}
      />
      <ul data-testid="appointment-list">
        {filtered.map(a => (
          <li key={a._id} data-testid="appointment-item">
            <strong>{a.doctor}</strong> — {a.reason}  
            <br />
            {new Date(a.date).toLocaleString()} — Status: {a.status}
            <button
              data-testid={`select-appointment-${a._id}`}
              onClick={() => alert(`Selected appointment: ${a._id}`)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
