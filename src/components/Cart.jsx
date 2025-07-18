
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Calculate order total
  useEffect(() => {
    setOrderValue(
      products.reduce((sum, product) => {
        return sum + product.price * (cart[product.pid] ?? 0);
      }, 0)
    );
  }, [products, cart]);

  const increment = (pid) => {
    setCart((prev) => ({
      ...prev,
      [pid]: (prev[pid] || 0) + 1
    }));
  };

  const decrement = (pid) => {
    setCart((prev) => ({
      ...prev,
      [pid]: Math.max((prev[pid] || 1) - 1, 0)
    }));
  };

  const placeOrder = async () => {
    if (!products || products.length === 0) {
      alert("Products are still loading. Please wait and try again.");
      return;
    }
    const url = `${API}/orders/new`;
    // Prepare items array from cart and products
    const items = Object.entries(cart)
      .filter(([pid, qty]) => qty > 0)
      .map(([pid, qty]) => {
        // Ensure both pid and cart keys are strings for comparison
        const prod = products.find((p) => String(p.pid) === String(pid));
        return prod ? { pid: prod.pid, name: prod.name, price: prod.price, quantity: qty } : null;
      })
      .filter(Boolean);
    if (items.length === 0) {
      alert("Your cart is empty or products are not available.");
      return;
    }
    const payload = {
      email: user.email,
      orderValue: orderValue,
      items
    };

    console.log("🔄 Trying to place order to:", url);
    console.log("📦 Payload:", payload);

    try {
      const res = await axios.post(url, payload);
      console.log("✅ Order success:", res.data);

      setCart({});
      Navigate("/order");
    } catch (err) {
      console.error("❌ Order failed:", err.response?.data || err.message);
      alert("Failed to place order. Please try again.");
    }
  };

  const loginToOrder = () => {
    Navigate("/login");
  };

  return (
    <div className="cart-outer-container">
      <div className="cart-main-container">
        <h2>My Cart</h2>
        {products &&
          products.map(
            (product) =>
              cart[product.pid] > 0 && (
                <div key={product.pid} className="cart-item-row">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{product.name}</span>
                    <span className="cart-item-price">₹{product.price}</span>
                  </div>
                  <div className="cart-qty-controls">
                    <button className="cart-qty-btn" onClick={() => decrement(product.pid)}>-</button>
                    <span className="cart-qty-value">{cart[product.pid]}</span>
                    <button className="cart-qty-btn" onClick={() => increment(product.pid)}>+</button>
                  </div>
                  <div className="cart-item-total">₹{product.price * cart[product.pid]}</div>
                </div>
              )
          )}
        <hr />
        <h3>Order Value: ₹{orderValue}</h3>
        <hr />
        {user.name ? (
          <button onClick={() => {
            console.log("🟢 Button clicked");
            placeOrder();
          }}>Place Order</button>
        ) : (
          <button onClick={() => {
            console.log("🟠 Login button clicked");
            loginToOrder();
          }}>Login to Order</button>
        )}
        <hr />
      </div>
    </div>
  );
}
