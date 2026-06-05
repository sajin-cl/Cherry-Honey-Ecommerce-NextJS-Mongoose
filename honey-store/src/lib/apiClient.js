/**
 * Frontend API client utility to unify fetches.
 * Wraps fetching logic with standard content-type headers, request methods, and error checking.
 */

async function fetcher(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body !== "string" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  // If body is FormData, delete Content-Type so the browser sets it automatically with the boundary
  if (config.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const res = await fetch(url, config);
  
  if (res.status === 401) {
    return { status: 401, error: "Unauthorized" };
  }

  const contentType = res.headers.get("content-type");
  let data = {};
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    throw new Error(data.error || `HTTP error! Status: ${res.status}`);
  }

  return data;
}

export const apiClient = {
  // Auth
  getMe: () => fetcher("/api/auth/me"),
  login: (email, password) => fetcher("/api/auth/login", { method: "POST", body: { email, password } }),
  register: (body) => fetcher("/api/auth/register", { method: "POST", body }),
  logout: () => fetcher("/api/auth/logout", { method: "POST" }),
  forgotPassword: (email) => fetcher("/api/auth/forgot-password", { method: "POST", body: { email } }),
  resetPassword: (body) => fetcher("/api/auth/reset-password", { method: "POST", body }),

  // Cart
  getCart: () => fetcher("/api/cart"),
  addToCart: (productId, weight, qty) => fetcher("/api/cart", { method: "POST", body: { productId, weight, qty } }),
  
  // Products & Reviews
  getProducts: (params = "") => fetcher(`/api/products${params ? `?${params}` : ""}`),
  getProductById: (id) => fetcher(`/api/products/${id}`),
  submitReview: (productId, rating, comment) =>
    fetcher(`/api/products/${productId}/reviews`, { method: "POST", body: { rating: Number(rating), comment } }),
  
  // Addresses
  getAddresses: () => fetcher("/api/user/addresses"),
  addAddress: (addressData) => fetcher("/api/user/addresses", { method: "POST", body: addressData }),

  // Contact
  submitContact: (contactData) => fetcher("/api/contact", { method: "POST", body: contactData }),

  // Orders
  getOrders: () => fetcher("/api/orders"),
  getOrderDetails: (id) => fetcher(`/api/orders/${id}`),
  createOrder: (orderData) => fetcher("/api/orders", { method: "POST", body: orderData }),
  updateOrderStatus: (id, status) => fetcher(`/api/orders/${id}`, { method: "PUT", body: { status } }),

  // Upload (FormData)
  uploadImage: (formData) => fetcher("/api/upload", { method: "POST", body: formData }),

  // Categories
  getCategories: () => fetcher("/api/categories"),
  createCategory: (name) => fetcher("/api/categories", { method: "POST", body: { name } }),
  updateCategory: (id, name) => fetcher(`/api/categories/${id}`, { method: "PUT", body: { name } }),
  deleteCategory: (id) => fetcher(`/api/categories/${id}`, { method: "DELETE" }),
  deleteProduct: (id) => fetcher(`/api/products/${id}`, { method: "DELETE" }),
};
