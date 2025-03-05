import axios from "axios";

const API_URL = '';

const getCart = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const addToCart = async (productId, quantity) => {
    await axios.post(API_URL, { productId, quantity });
};

const removeFromCart = async (itemId) => {
    await axios.delete(`${API_URL}/${itemId}`);
};

export default {
    getCart,
    addToCart,
    removeFromCart
};