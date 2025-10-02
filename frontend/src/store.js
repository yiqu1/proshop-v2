import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({
  // register all slices (state managers)
  reducer: {
    // with RTK Query, add API slice reducer. reducerPath is a special property that RTK Query generates automatically.
    // apiSlice.reducer This is the reducer that RTK Query uses internally to keep track of request status, caching, errors, etc.
    // Without adding this, hooks (useGetProductsQuery, etc.) won’t work.
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
