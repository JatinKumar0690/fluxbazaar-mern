import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const getMyOrders = async (token) => {
    const res = await axios.get(`${API_URL}/my`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data.orders;
};

