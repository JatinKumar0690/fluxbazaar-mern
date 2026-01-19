import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/api/products`);
  return res.data.products || res.data.data || [];
};

export const getSingleProduct = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/products/${id}`);
  return res.data.product || res.data.data;
};
