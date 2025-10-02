import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// make network requests
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

// creat an API “slice” of Redux store. It manages server state (data fetched from backend) and caches it automatically.
export const apiSlice = createApi({
  baseQuery,
  // cache keys for auto-refetching when data changes
  tagTypes: ["Product", "Order", "User"],
  // placeholder where to define all API calls
  endpoints: (builder) => ({}),
});
