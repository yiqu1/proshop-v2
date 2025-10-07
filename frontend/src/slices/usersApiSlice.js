import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

// injectEndpoints allows you to add endpoints to an existing API slice after it’s created
// Useful if you want to split API logic across multiple files (e.g., productsApiSlice.js, usersApiSlice.js) but still share the same apiSlice reducer and middleware.
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // hit backend /auth api
    login: builder.mutation({
      // send email and password
      query: (data) => ({
        // login endpoint
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    // hit backend /logout api
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    // backend register api
    register: builder.mutation({
      // send name, email, password
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    // update user profile
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// export custom hooks
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = usersApiSlice;
