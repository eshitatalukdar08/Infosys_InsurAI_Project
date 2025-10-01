// import apiClient from './apiClient';

// export const userPoliciesApi = {
//   // Get all policies for a specific user
//   getUserPolicies: async (userId) => {
//     const response = await apiClient.get(`/api/user-policies/user/${userId}`);
//     return response.data;
//   },

//   // Purchase a policy (create user-policy)
//   purchasePolicy: async (userPolicyData) => {
//     const response = await apiClient.post('/api/user-policies', userPolicyData);
//     return response.data;
//   },

//   // Renew a policy
//   renewPolicy: async (id, newExpiryDate) => {
//     const response = await apiClient.put(`/api/user-policies/${id}/renew`, null, {
//       params: { newExpiryDate }
//     });
//     return response.data;
//   },

//   // Delete user policy
//   deleteUserPolicy: async (id) => {
//     const response = await apiClient.delete(`/api/user-policies/${id}`);
//     return response.data;
//   }
// };

import apiClient from './apiClient';

export const userPoliciesApi = {

  getAllUserPolicies: async () => {
    const response = await apiClient.get('/api/user-policies/all');
    return response.data; // Expecting an array of objects { user: {...}, policies: [...] }
  },
  
  // Get all policies for a specific user
  getUserPolicies: async (userId) => {
    // ⚠️ CHANGE HERE: Ensure userId is a number
    const response = await apiClient.get(`/api/user-policies/user/${userId}`);
    return response.data;
  },

  // Purchase a policy (create user-policy)
  purchasePolicy: async (userPolicyData) => {
    const response = await apiClient.post('/api/user-policies', userPolicyData);
    return response.data;
  },

  // Renew a policy
  renewPolicy: async (id, newExpiryDate) => {
    const response = await apiClient.put(`/api/user-policies/${id}/renew`, null, {
      params: { newExpiryDate }
    });
    return response.data;
  },

  // Delete user policy
  deleteUserPolicy: async (id) => {
    const response = await apiClient.delete(`/api/user-policies/${id}`);
    return response.data;
  }
};