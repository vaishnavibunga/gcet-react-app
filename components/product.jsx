import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function Product() {
  const { user, addToCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get(`https://gcet-node-app-lake.vercel.app/products/all`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Welcome {user.name}!</h3>
      <div className="App-Product-Row">
        {products.map((value) => (
          <div className="product-card" key={value._id}>
            <img
              src={value.imgUrl}
              alt={value.name}
              className="product-image"
            />
            <h3>{value.name}</h3>
            <h4>₹{value.price}</h4>
            <button onClick={() => addToCart(value)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => navigate("/cart")} className="btn">
        🛒 Go to Cart
      </button>
    </div>
  );
}