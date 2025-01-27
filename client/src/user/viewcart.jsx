import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar"; // Your Navbar component
import './cart.css';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/user/viewcart`, { headers: { token: token } })
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!cart || cart.length === 0) {
    return <h1>Your cart is empty</h1>;
  }

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((total, cartItem) => {
    return total + cartItem.items.reduce((itemTotal, item, index) => {
      const itemPrice = parseInt(cartItem.productDetails[index].price, 10); // Match price with the correct product
      return itemTotal + itemPrice * item.quantity;
    }, 0);
  }, 0);

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cart.map((cartItem, index) => (
  <div key={index} className="cart-item">
    {cartItem.items.map((item, itemIndex) => (
      <div key={itemIndex} className="cart-sub-item">
        <img
          src={`http://localhost:9000/${cartItem.productDetails[itemIndex].images[0]}`} // Use `itemIndex` to dynamically change the accessed element
          alt={cartItem.productDetails[itemIndex].description[0].product} // Use `itemIndex` dynamically
          className="cart-item-image"
        />
        <div className="cart-item-details">
          <h2>{cartItem.productDetails[itemIndex].description[0].product}</h2>
          <p>Price: Rs. {cartItem.productDetails[itemIndex].price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Size: {item.size}</p>
          <p>
            Total Price for this item: Rs.{" "}
            {item.quantity * parseInt(cartItem.productDetails[itemIndex].price, 10)}
          </p>
        </div>
      </div>
    ))}
  </div>
))}

       

        <div className="cart-total">
          <h2>Total Price of All Items: Rs. {totalPrice}</h2>
        </div>
      </div>
    </>
  );
}
