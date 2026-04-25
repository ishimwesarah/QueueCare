import { useState } from "react";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import AppointmentForm from "./components/AppointmentForm.js";
import AppointmentList from "./components/AppointmentList.js";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("login"); // default page is login

  if (!token) {
    return (
      <div>
        <h1>QueueCare Clinic</h1>
        {page === "login" ? (
          <>
            <Login setToken={setToken} />
            <button
              data-testid="go-register"
              onClick={() => setPage("register")}
            >
              Go to Register
            </button>
          </>
        ) : (
          <>
            <Register />
            <button
              data-testid="go-login"
              onClick={() => setPage("login")}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>QueueCare Clinic</h1>
      <AppointmentForm token={token} />
      <AppointmentList token={token} />
    </div>
  );
}
