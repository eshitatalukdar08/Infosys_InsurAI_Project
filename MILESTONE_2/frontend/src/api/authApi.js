import apiClient from './apiClient';

export const authApi = {
  // Register a new user
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data; // Returns plain string: "User registered successfully!"
  },

  // Login user
  // IMPORTANT: Backend returns raw JWT string, not JSON
  // We must use responseType: 'text' to handle this properly
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data; // Returns raw JWT token string
  }
};