import apiClient from './apiClient';

export const policiesApi = {
  // Get all policies
  getAllPolicies: async () => {
    const response = await apiClient.get('/api/policies');
    return response.data;
  },

  // Get policy by ID
  getPolicyById: async (id) => {
    const response = await apiClient.get(`/api/policies/${id}`);
    return response.data;
  },

  // Create new policy (admin only)
  createPolicy: async (policyData) => {
    const response = await apiClient.post('/api/policies', policyData);
    return response.data;
  },

  // Update policy (admin only)
  updatePolicy: async (id, policyData) => {
    const response = await apiClient.put(`/api/policies/${id}`, policyData);
    return response.data;
  },

  // Delete policy (admin only)
  deletePolicy: async (id) => {
    const response = await apiClient.delete(`/api/policies/${id}`);
    return response.data;
  }
};