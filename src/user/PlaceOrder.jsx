import React, { useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useLocation, useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartData = location.state.cartData

  

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentType: ""  
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  useEffect(() => {
    const items = [
      { id: 1, name: "Product 1", quantity: 2, price: 50 },
      { id: 2, name: "Product 2", quantity: 1, price: 100 }
    ];
    setOrderItems(items);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
   
    if (
      !shippingAddress.address.trim() ||
      !shippingAddress.city.trim() ||
      !shippingAddress.postalCode.trim() ||
      !shippingAddress.country.trim() ||
      !shippingAddress.paymentType.trim()
    ) {
      setError("Please fill in all shipping address fields and select a payment type");
      return;
    }    
    setError("");
    setSuccess("Order placed successfully!");
  };

  if (!cartData || !cartData.cartItemDtoList || cartData.cartItemDtoList.length === 0) {
    return (
      <div className="order-page">
        <h2>No cart data found. Please add items to your cart.</h2>
        <button onClick={() => navigate("/cart")}>Go to Cart</button>
      </div>
    );
  }

  const calculatedTotal = cartData.cartItemDtoList.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);


  return (
    <div className="place-order-container">
      <h2>Place Order</h2>
        
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartData.cartItemDtoList.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">
        <span>Total Amount:</span>
        <span>${(cartData.amount || calculatedTotal).toFixed(2)}</span>
      </div>
      </div>
      
      <div className="shipping-form">
        <h3>Shipping Address</h3>
        <div className="form-group">
          <label>Address:</label>
          <input 
            type="text" 
            name="address" 
            value={shippingAddress.address} 
            onChange={handleChange} 
            placeholder="Street address" 
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input 
            type="text" 
            name="city" 
            value={shippingAddress.city} 
            onChange={handleChange} 
            placeholder="City" 
          />
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input 
            type="text" 
            name="postalCode" 
            value={shippingAddress.postalCode} 
            onChange={handleChange} 
            placeholder="Postal Code" 
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input 
            type="text" 
            name="country" 
            value={shippingAddress.country} 
            onChange={handleChange} 
            placeholder="Country" 
          />
        </div>
        <div className="form-group">
          <label>Payment Type:</label>
          <select 
            name="paymentType"
            value={shippingAddress.paymentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Type</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
      </div>
      
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;