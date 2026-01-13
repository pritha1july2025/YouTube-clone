import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert("Enter valid email and password or Register if you are a new User or ");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
