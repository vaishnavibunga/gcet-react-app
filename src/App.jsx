// App.jsx

import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Orders from "./components/Orders";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "Guest" }); // fallback default
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item._id === product._id);
      if (index !== -1) {
        const updatedCart = [...prev];
        updatedCart[index].quantity += 1;
        return updatedCart;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser, cart, setCart, addToCart }}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
             <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;