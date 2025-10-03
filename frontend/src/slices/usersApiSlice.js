import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

// injectEndpoints allows you to add endpoints to an existing API slice after it’s created
// Useful if you want to split API logic across multiple files (e.g., productsApiSlice.js, usersApiSlice.js) but still share the same apiSlice reducer and middleware.
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // send email and password
      query: (data) => ({
        // login endpoint
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// export custom hooks
export const { useLoginMutation } = usersApiSlice;
