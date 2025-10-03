import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

// injectEndpoints allows you to add endpoints to an existing API slice after it’s created
// Useful if you want to split API logic across multiple files (e.g., productsApiSlice.js, usersApiSlice.js) but still share the same apiSlice reducer and middleware.
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      // keep this data in the cache for 5 seconds after the last component stops using it.
      keepUnusedDataFor: 5,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// export custom hooks
export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
