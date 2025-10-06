import { ORDERS_URL, PAYPAL_URL } from "../constants.js";
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

    // pay order, query function only accepts one argument
    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        // send payment result object directly
        body: paymentResult,
      }),
    }),

    // Fetch PayPal Client ID from backend and keep it cached 5s
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// export custom hooks
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = ordersApiSlice;
