import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `https://gcet-node-app-lake.vercel.app/orders/all?email=${user.email}`
          );
          setOrders(res.data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (!user || !user.email) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>Please log in to view your orders.</h3>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Order Value:</strong> ₹{order.orderValue}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items?.map((item, i) => (
                  <li key={i}>
                    {item.name} - ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
              <small><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}