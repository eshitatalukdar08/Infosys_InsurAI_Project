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
  //     // authApi.login returns raw JWT string due to responseType: 'text'
  //     const token = await authApi.login(credentials);
  //     localStorage.setItem('token', token);
      
  //     const decoded = decodeToken(token);
  //     if (decoded) {
  //       const userData = {
  //         id: decoded.userId || decoded.sub || null,
  //         username: decoded.username || decoded.sub || credentials.username,
  //         roles: decoded.roles || decoded.authorities || ['user'],
  //       };
        
  //       if (!userData.id) {
  //         console.warn('⚠️  JWT token does not contain userId. Using fallback strategy or consider updating backend.');
  //         // Fallback: You might want to make an additional API call here to get user info
  //         // userData.id = await getCurrentUserId(); // If such endpoint exists
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
      // Get the full response object from the backend
      const response = await authApi.login(credentials);
      
      // Extract the token from the response object
      // The backend now returns { "token": "..." }
      const token = response.token; 
      
      localStorage.setItem('token', token);
      
      const decoded = decodeToken(token);
      if (decoded) {
        const userData = {
          id: decoded.userId || decoded.sub || null,
          username: decoded.username || decoded.sub || credentials.username,
          roles: decoded.roles || decoded.authorities || ['user'],
        };
        
        if (!userData.id) {
          console.warn('⚠️ JWT token does not contain userId. Backend should include userId in JWT payload or provide /users/me endpoint');
        }
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      return { success: false, error: 'Invalid token received' };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.response?.data || 'Login failed' };
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