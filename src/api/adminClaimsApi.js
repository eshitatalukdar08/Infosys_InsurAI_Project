// import axios from 'axios';
// const API_URL = 'http://localhost:8080/api/admin/claims';

// export const adminClaimsApi = {
//   getAllClaims: () => axios.get(API_URL).then(res => res.data),
//   updateClaimStatus: (id, body) => axios.put(`${API_URL}/${id}/decision`, body).then(res => res.data)
// };


import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/admin/claims';

// Get token - CHECK ALL POSSIBLE LOCATIONS
const getAuthToken = () => {
  // Check all common token storage locations
  const locations = [
    localStorage.getItem('token'),
    localStorage.getItem('authToken'),
    localStorage.getItem('jwtToken'),
    localStorage.getItem('accessToken'),
    localStorage.getItem('auth_token'),
    sessionStorage.getItem('token'),
    sessionStorage.getItem('authToken'),
    sessionStorage.getItem('jwtToken'),
  ];

  const token = locations.find(t => t != null);
  
  // DIAGNOSTIC LOGGING
  console.log('🔍 Token Search Results:');
  console.log('localStorage.token:', localStorage.getItem('token'));
  console.log('localStorage.authToken:', localStorage.getItem('authToken'));
  console.log('sessionStorage.token:', sessionStorage.getItem('token'));
  console.log('Found token:', token ? 'YES ✅' : 'NO ❌');
  if (token) {
    console.log('Token preview:', token.substring(0, 50) + '...');
  }
  
  return token;
};

// Create headers with authorization
const getHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('✅ Authorization header added');
  } else {
    console.error('❌ NO TOKEN FOUND - Request will fail with 403');
  }
  
  return headers;
};

export const adminClaimsApi = {
  // GET all claims
  getAllClaims: async () => {
    console.log('📡 Making GET request to:', API_BASE_URL);
    try {
      const headers = getHeaders();
      console.log('Request headers:', headers);
      
      const response = await axios.get(API_BASE_URL, { headers });
      console.log('✅ Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Get all claims error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  // PUT update claim decision
  updateClaimDecision: async (claimId, decisionData) => {
    console.log('📡 Making PUT request to:', `${API_BASE_URL}/${claimId}/decision`);
    console.log('Request body:', decisionData);
    try {
      const headers = getHeaders();
      const response = await axios.put(
        `${API_BASE_URL}/${claimId}/decision`,
        decisionData,
        { headers }
      );
      console.log('✅ Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Update claim decision error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }
};