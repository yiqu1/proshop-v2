import { ORDERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // hit backend create new order api /orders
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

// export custom hooks
export const { useCreateOrderMutation } = ordersApiSlice;
