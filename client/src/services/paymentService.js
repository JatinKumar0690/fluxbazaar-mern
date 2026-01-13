import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

export const createRazorpayOrder = async (amount, token) => {
  const res = await axios.post(
    `${API_URL}/create`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const verifyRazorpayPayment = async (data, token) => {
  const res = await axios.post(
    `${API_URL}/verify`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
