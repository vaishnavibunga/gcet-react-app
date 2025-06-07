import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://gcet-node-app-lake.vercel.app/users/login", {
        email: user.email,
        pass: user.pass,
      });

      const found = res.data;

      if (found && found.name) {
        setMsg("Welcome " + found.name);
        setUser({ ...user, name: found.name, token: "123" });
        navigate("/");
      } else {
        setMsg("Invalid email or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response?.status === 401) {
        setMsg("Invalid email or password");
      } else {
        setMsg("Something went wrong during login");
      }
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Login</h3>
      <p style={{ color: "red" }}>{msg}</p>
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
          placeholder="Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}