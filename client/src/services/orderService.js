import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/orders`;

export const getMyOrders = async (token) => {
  const res = await axios.get(
    `${API_URL}/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.orders;
};
