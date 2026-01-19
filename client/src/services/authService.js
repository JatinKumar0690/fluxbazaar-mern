import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (userData) => {
  const res = await axios.post(
    `${BASE_URL}/api/auth/register`,
    userData
  );
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post(
    `${BASE_URL}/api/auth/login`,
    userData
  );
  return res.data;
};
