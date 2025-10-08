import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtil";

// JSON.parse converts to js object
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add a product to cart
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

      // updates price related states in the cart state
      return updateCart(state);
    },

    // action's payload is the productId
    removeFromCart: (state, action) => {
      // condition is true are included in newArray
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },

    // save shipping address
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      // save shippingAddress to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // save payment method
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // clear cart items once creating the order
    clearCartItems: (state) => {
      state.cartItems = [];
      // save cartItems to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // return initial cart state
    resetCart: () => initialState,
  },
});

// takes addToCart action creator from cartSlice.actions and exports it.
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

// import it into Redux store:
export default cartSlice.reducer;
