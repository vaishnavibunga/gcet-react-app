import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "https://gcet-node-app-lake.vercel.app";

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/users/register`, user);

      // Optionally store in frontend context
      setUsers([...users, user]);

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Register</h3>
      <p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>

      <hr />
      {users &&
        users.map((value, index) => (
          <li key={index}>
            {value.name} - {value.email} - {value.pass}
          </li>
        ))}
    </div>
  );
}