import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/cart`

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.cart;
});

export const addToCart = createAsyncThunk("cart/add", async (productId) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    API,
    { productId, quantity: 1 },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.cart;
});

export const updateCartQuantity = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      API,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.cart;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API}/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.cart;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: { items: [] }, loading: false },
  reducers: {
    clearCart: (state) => {
      state.cart = { items: [] }; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchCart.fulfilled, (s, a) => {
        s.cart = a.payload;
        s.loading = false;
      })
      .addCase(addToCart.fulfilled, (s, a) => {
        s.cart = a.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (s, a) => {
        s.cart = a.payload;
      })
      .addCase(removeFromCart.fulfilled, (s, a) => {
        s.cart = a.payload;
      });
  },
});


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
