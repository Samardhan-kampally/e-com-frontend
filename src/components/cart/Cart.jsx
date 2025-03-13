import React, { useEffect, useState } from 'react';
import './Cart.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import CartService from './CartService';
import axios from 'axios';
import { useNotification } from '../../services/notification/NotificationProvider';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState(false)
  const navigate = useNavigate()
  const {showNotification} = useNotification()
    
      const fetchCart = async () => {
        try {
          console.log("get cart")
          const userId = localStorage.getItem("USERID")
          const res = await CartService.getCart(userId);
          console.log(res.data)
          setCartItems(res.data);
          setLoading(false);
        } catch (err) {
          
          showNotification("Error fetching cart List", "error", 3000);
          setLoading(false);
          
        }
      };
    
      useEffect(() => {
          
              const role = localStorage.getItem("USERROLE")=== "USER" 
              const token = localStorage.getItem("TOKEN");
              if(role && token){
                setIsLoggedIn(true)
                setUser(true)
                console.log(true,"have Access")
          
              }else{
              // navigate("/login")
              setUser(false)
              setIsLoggedIn(false);
              console.log(false,"Login Again")
              alert("You must be an admin to access this page -- Please Login")
              
              }
           
        fetchCart();
      }, []);
    
      // Remove an item from the cart
      const handleRemove = async (itemId) => {
        try {
          await CartService.removeFromCart(itemId);
          // Update the cart state after deletion
          fetchCart();
        } catch (err) {
          console.error("Error removing item:", err);
          showNotification("Error removing item from cart", "error", 3000);
        }
      };
    
      
    
      if (loading) {
        return <div className="cart-page">Loading cart...</div>;
      }

  const handleIncrease = async(id) => {
console.log(id)
    try {
        const res=await CartService.addQuantity(id)
        showNotification("Quantity Increased", "success", 3000);
        fetchCart()
        
    } catch (error) {
      showNotification("Error to increase", "error", 3000);
    }
    
  };

  const handleDecrease = async(id) => {
    
    try {
        const res = await CartService.minusQuantity(id)
        showNotification("Quantity decreased", "error", 3000);
        fetchCart()
    } catch (error) {
      showNotification("Error to decrease", "error", 3000);
    }
  };

//   const handleRemove = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToOrder = () => {
    alert('Proceeding to order...');
    navigate("/user/placeorder",{state:{cartData: cartItems}})
    
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {(!cartItems || !cartItems.cartItemDtoList || cartItems.cartItemDtoList.length === 0)? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.cartItemDtoList.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`data:image/jpeg;base64,${item.returnedImage}`} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4>{item.productName}</h4>
                <p>Price: ${item.price}</p>
                <span>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(item.productId)} disabled={item.quantity == 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.productId)}>+</button>
                </div>
                </span>
              </div>
              <button className="remove-button" onClick={() => handleRemove(item.productId)}>
                Remove
              </button>
            </div>
          ))}
          <div className="total-price">
            <h3>Total Price: ${cartItems.amount}</h3>
          </div>
          
          <button className="proceed-button" onClick={handleProceedToOrder}>
            Proceed to Order
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Cart;