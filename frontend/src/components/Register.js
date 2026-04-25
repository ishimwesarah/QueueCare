import { useState } from "react";
import { register } from "../api/auth.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await register(form);
    alert(JSON.stringify(result));
  }

  return (
   <form onSubmit={handleSubmit} data-testid="register-form">
  <input data-testid="register-name" placeholder="Name"
         onChange={e => setForm({ ...form, name: e.target.value })} />
  <input data-testid="register-email" placeholder="Email"
         onChange={e => setForm({ ...form, email: e.target.value })} />
  <input data-testid="register-password" type="password" placeholder="Password"
         onChange={e => setForm({ ...form, password: e.target.value })} />
  <select data-testid="register-role"
          onChange={e => setForm({ ...form, role: e.target.value })}>
    <option value="patient">Patient</option>
    <option value="staff">Staff</option>
    <option value="admin">Admin</option>
  </select>
  <button data-testid="register-submit" type="submit">Register</button>
</form>

  );
}
