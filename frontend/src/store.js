import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import cartSliceReducer from "./slices/cartSlice.js";
import authSliceReducer from "./slices/authSlice.js";

const store = configureStore({
  // register all slices (state managers)
  reducer: {
    // with RTK Query, add API slice reducer. reducerPath is a special property that RTK Query generates automatically.
    // apiSlice.reducer This is reducer that RTK Query uses internally to keep track of request status, caching, errors, etc.
    // Without adding this, hooks (useGetProductsQuery, etc.) won’t work.
    [apiSlice.reducerPath]: apiSlice.reducer,
    // slice name (cart) becomes the key in store state, and the reducer controls how cart state changes.
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
