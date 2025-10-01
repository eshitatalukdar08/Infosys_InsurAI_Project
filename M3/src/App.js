import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import PolicyDetail from './pages/PolicyDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Claims from './pages/Claims';
import AdminDashboard from './pages/AdminDashboard';
import AdminPolicies from './pages/AdminPolicies';
import AdminUsers from './pages/AdminUsers';
import AdminClaims from './pages/AdminClaims'; // <--- ADD THIS LINE
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main App Routes */}
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          
          <Route path="/policy/:id" element={
            <MainLayout>
              <PolicyDetail />
            </MainLayout>
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/claims" element={
            <ProtectedRoute>
              <MainLayout>
                <Claims />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          } />
          
          <Route path="/admin/policies" element={
            <AdminRoute>
              <AdminLayout>
                <AdminPolicies />
              </AdminLayout>
            </AdminRoute>
          } />
          
          // Inside App.js, under the Admin Routes section:

          <Route path="/admin/claims" element={
            <AdminRoute>
              <AdminLayout>
                <AdminClaims /> {/* <--- ADD THIS LINE */}
              </AdminLayout>
            </AdminRoute>
          } />

          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;