import apiClient from './apiClient';

export const userClaimsApi = {

  getAllUserClaims: async () => {
    const response = await apiClient.get('/api/admin/claims');
    return response.data; // Expecting an array of objects { user: {...}, policies: [...] }
  }
};