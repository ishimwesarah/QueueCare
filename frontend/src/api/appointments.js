const BASE_URL = "http://localhost:5000/api";

export async function createAppointment(token, data) {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getAppointments(token) {
  const res = await fetch(`${BASE_URL}/appointments`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}
