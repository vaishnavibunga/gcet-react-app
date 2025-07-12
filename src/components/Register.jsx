import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const navigate = useNavigate();

  // ⭐ controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL; // e.g. http://localhost:5000/api

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();              // stop default form reload

    // simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(`${API}/users/register`, formData);

      // optional: keep a local copy so you can immediately list it
      setUsers && setUsers((prev) => [...prev, data.user || formData]);

      navigate("/login");            // go to login page
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Register</h3>

      <form onSubmit={handleSubmit}>
        <p>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </p>

        <p>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </p>

        <p>
          <input
            name="password"
            type="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
          />
        </p>

        <button type="submit" disabled={loading}>
          {loading ? "Registering…" : "Submit"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <hr />

      <ul>
        {users?.map((u, i) => (
          <li key={i}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
