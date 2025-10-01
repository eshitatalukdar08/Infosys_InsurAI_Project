import { useState, useEffect, createContext, useContext } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext();

// Helper function to decode JWT token
// IMPORTANT: Backend returns raw JWT string, we need to decode it to extract user info
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decoded = decodeToken(token);
  //     if (decoded) {

  //       const userData = {
  //         id: decoded.userId || decoded.sub || null, // Try common JWT fields
  //         username: decoded.username || decoded.sub || null,
  //         roles: decoded.roles || decoded.authorities || ['user'], // Default to 'user' role

  //       };
        
  //       if (!userData.id) {
  //         console.warn('⚠️  JWT token does not contain userId. Backend should include userId in JWT payload or provide /users/me endpoint');
  //       }
        
  //       setUser(userData);
  //       localStorage.setItem('user', JSON.stringify(userData));
  //     }
  //   }
  //   setLoading(false);
  // }, []);

  //new useEffect

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Add a more robust check for the token
    if (token && typeof token === 'string' && token.length > 0) {
      const decoded = decodeToken(token);
      if (decoded) {
        const userData = {
          id: decoded.userId || decoded.sub || null,
          username: decoded.username || decoded.sub || null,
          roles: decoded.roles || decoded.authorities || ['user'],
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // If the token is invalid, clear it from local storage
        console.warn('🚨 Invalid or expired token found. Clearing local storage.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  
  // const login = async (credentials) => {
  //   try {
  //     // Get the full response object from the backend
  //     const response = await authApi.login(credentials);
      
  //     // Extract the token from the response object
  //     // The backend now returns { "token": "..." }
  //     const token = response.token; 
      
  //     localStorage.setItem('token', token);
      
  //     const decoded = decodeToken(token);
  //     if (decoded) {
  //       const userData = {
  //         id: decoded.userId || decoded.sub || null,
  //         username: decoded.username || decoded.sub || credentials.username,
  //         roles: decoded.roles || decoded.authorities || ['user'],
  //       };
        
  //       if (!userData.id) {
  //         console.warn('⚠️ JWT token does not contain userId. Backend should include userId in JWT payload or provide /users/me endpoint');
  //       }
        
  //       setUser(userData);
  //       localStorage.setItem('user', JSON.stringify(userData));
  //       return { success: true, user: userData };
  //     }
  //     return { success: false, error: 'Invalid token received' };
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     return { success: false, error: error.response?.data || 'Login failed' };
  //   }
  // };

  const login = async (credentials) => {
  try {
    console.log('🚀 Starting login process...');
    const response = await authApi.login(credentials);

    // Make sure the backend actually returned a token
    if (!response || !response.token) {
      console.log('❌ No token in response:', response);
      return { success: false, error: response?.message || 'Invalid credentials' };
    }

    const token = response.token;
    console.log('✅ Token received, attem pting to decode...');
    const decoded = decodeToken(token);
    if (!decoded) {
       console.log('❌ Failed to decode token');
      return { success: false, error: 'Invalid token received' };
    }

     console.log('✅ Token decoded successfully:', decoded);
     
    const userData = {
      id: decoded.userId || decoded.sub || null,
      username: decoded.username || decoded.sub || credentials.username,
      roles: decoded.roles || decoded.authorities || ['user'],
    };

    console.log('✅ User data prepared:', userData);

    // ✅ Only store token and user after all checks
    localStorage.setItem('token', token);
    // setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    console.log('✅ Login successful'); 
    return { success: true, user: userData };
  } catch (error) {
    console.error('Login failed:', error);
    // return { success: false, error: error.response?.data?.message || 'Login failed' }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      
      // Extract error message more carefully
      let errorMessage = 'Login failed';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string' && error.response.data.trim().length > 0) {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
  }
};


  const register = async (userData) => {
    try {
      const message = await authApi.register(userData);
      return { success: true, message };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.response?.data || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = () => {
    return user?.roles?.includes('admin') || user?.roles?.includes('ADMIN');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};