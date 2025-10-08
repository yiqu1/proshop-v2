import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

// injectEndpoints allows you to add endpoints to an existing API slice after it’s created
// Useful if you want to split API logic across multiple files (e.g., productsApiSlice.js, usersApiSlice.js) but still share the same apiSlice reducer and middleware.
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: builder.query({
    //   query: () => ({
    //     url: PRODUCTS_URL,
    //   }),
    //   // keep this data in the cache for 5 seconds after the last component stops using it.
    //   keepUnusedDataFor: 5,
    //   // mark cached data with this tag
    //   providesTags: ["Product"],
    // }),

    // paginate products
    getProducts: builder.query({
      query: (pageNumber) => ({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
        },
      }),
      // keep this data in the cache for 5 seconds after the last component stops using it.
      keepUnusedDataFor: 5,
      // mark cached data with this tag
      providesTags: ["Product"],
    }),

    // get a product detail
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // create a product for admin user
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
        // body: data,
      }),
      // mark 'Product' cache as stale, → getProducts refetches automatically.
      invalidatesTags: ["Product"],
    }),

    // update a product for admin user
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // upload product image api
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),

    // delete a product api for admin user
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),

    // create a review api for a user
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

// export custom hooks
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productsApiSlice;
