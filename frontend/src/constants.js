// In Vite, you can’t read NODE_ENV from .env directly. Vite ignores it unless it’s prefixed with VITE_
// Instead, Vite automatically gives you its own built-in variable:
export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export const PRODUCTS_URL = "/api/products";
export const ORDERS_URL = "/api/orders";
export const USERS_URL = "/api/users";
export const PAYPAL_URL = "/api/config/paypal";
export const UPLOAD_URL = "/api/upload";
