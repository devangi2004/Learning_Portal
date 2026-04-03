import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post("/auth/login", form);
      login(data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
      <p>New here? <Link to="/signup">Create account</Link></p>
    </form>
  );
}
