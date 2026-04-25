import { useState } from "react";
import { login } from "../api/auth.js";

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login(form);
    if (result.token) {
      setToken(result.token);
    } else {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
  <input data-testid="login-email" placeholder="Email"
         onChange={e => setForm({ ...form, email: e.target.value })} />
  <input data-testid="login-password" type="password" placeholder="Password"
         onChange={e => setForm({ ...form, password: e.target.value })} />
  <button data-testid="login-submit" type="submit">Login</button>
</form>

  );
}
