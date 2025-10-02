import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtil";

// JSON.parse converts to js object
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // reducer logic
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },
  },
});

// takes addToCart action creator from cartSlice.actions and exports it.
export const { addToCart } = cartSlice.actions;

// import it into Redux store:
export default cartSlice.reducer;
