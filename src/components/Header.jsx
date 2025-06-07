// Header.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="header">
      <div className="logo">🛍️ My Online Shop</div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user.token ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/orders">Orders</Link>
      </nav>
    </header>
  );
}