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

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      // keep this data in the cache for 5 seconds
      keepUnusedDataFor: 5,
    }),
  }),
});

// export custom hooks
export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
