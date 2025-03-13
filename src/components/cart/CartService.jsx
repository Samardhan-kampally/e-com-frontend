import axios from "axios";

const API_URL = "http://localhost:8080/api/customer/";

const getCart = async (userId) => {
  console.log(userId);
  const response = await axios.get(API_URL + `cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });
  return response;
};

const addToCart = async (data) => {
  const response = await axios.post(API_URL + "cart", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });

  return response;
};

const addQuantity = async (productId) => {
  const userId = localStorage.getItem("USERID");
  const response = await axios.post(API_URL + `${userId}/add/${productId}`,null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });
console.log(response)
  return response;
};

const minusQuantity = async (productId) => {
  const userId = localStorage.getItem("USERID");
  const response = await axios.post(API_URL + `${userId}/deduct/${productId}`,null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });

  return response;
};

const removeFromCart = async (itemId) => {
  const response = await axios.delete(API_URL + "cart", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
  });

  return response;
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  addQuantity,
  minusQuantity,
};
