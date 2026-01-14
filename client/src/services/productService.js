import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`

export const getAllProducts = async() => {
    const res = await axios.get(API_URL);
    return res.data.products;
}

export const getSingleProduct = async(id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data.product;
}