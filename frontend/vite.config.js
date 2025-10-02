import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // forward requests starting with /api to backend. This avoids CORS issues during development.
    proxy: {
      // Any request your frontend makes to /api/... will be forwarded to http://localhost:5000/api/....
      "/api": "http://localhost:5000",
    },
  },
});
