import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { userPoliciesApi } from '../api/userPoliciesApi';
import { useNotifications } from '../hooks/useNotifications';

const Dashboard = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [userPolicies, setUserPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activePolicies: 0,
    expiredPolicies: 0,
    totalCoverage: 0,
    monthlyPremium: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetchUserPolicies();
    }
  }, [user]);

  const fetchUserPolicies = async () => {
    try {
      const policies = await userPoliciesApi.getUserPolicies(user.id);
      setUserPolicies(policies);
      calculateStats(policies);
    } catch (error) {
      console.error('Failed to fetch user policies:', error);
      showError('Failed to load your policies');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (policies) => {
    const now = new Date();
    const active = policies.filter(p => new Date(p.expiryDate) > now);
    const expired = policies.filter(p => new Date(p.expiryDate) <= now);
    
    const totalCoverage = active.reduce((sum, p) => sum + (p.policy?.coverageAmount || 0), 0);
    const monthlyPremium = active.reduce((sum, p) => sum + (p.policy?.premium || 0), 0);

    setStats({
      activePolicies: active.length,
      expiredPolicies: expired.length,
      totalCoverage,
      monthlyPremium,
    });
  };

  const handleRenewPolicy = async (policyId) => {
    try {
      const newExpiryDate = new Date();
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
      const formattedDate = newExpiryDate.toISOString().split('T')[0];
      
      await userPoliciesApi.renewPolicy(policyId, formattedDate);
      showSuccess('Policy renewed successfully!');
      fetchUserPolicies(); // Refresh data
    } catch (error) {
      console.error('Failed to renew policy:', error);
      showError('Failed to renew policy');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) <= new Date();
  };

  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    return expiry <= thirtyDaysFromNow && expiry > now;
  };

  if (!user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User ID Not Available</h1>
          <p className="text-gray-600 mb-4">
            Your user session doesn't contain a user ID. This might indicate that the backend JWT token
            doesn't include the userId field.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Please check the backend JWT implementation or provide a /users/me endpoint.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.username}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Policies</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activePolicies}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-green-500 text-white p-3 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Coverage</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalCoverage)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-purple-500 text-white p-3 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Premium</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.monthlyPremium)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="bg-red-500 text-white p-3 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.016 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired Policies</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.expiredPolicies}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {userPolicies.some(p => isExpiringSoon(p.expiryDate)) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Policies Expiring Soon</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  You have policies that will expire within the next 30 days. Consider renewing them to maintain coverage.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Your Policies */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Your Policies</h2>
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Browse More →
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="spinner mb-4 mx-auto"></div>
                    <p className="text-gray-600">Loading your policies...</p>
                  </div>
                ) : userPolicies.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Policies Yet</h3>
                    <p className="text-gray-600 mb-4">You haven't purchased any insurance policies yet.</p>
                    <Link
                      to="/"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Browse Policies
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userPolicies.map((userPolicy) => (
                      <div
                        key={userPolicy.id}
                        className={`border rounded-lg p-4 ${
                          isExpired(userPolicy.expiryDate)
                            ? 'border-red-200 bg-red-50'
                            : isExpiringSoon(userPolicy.expiryDate)
                            ? 'border-yellow-200 bg-yellow-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {userPolicy.policy?.name || 'Policy'}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {userPolicy.policy?.description || 'No description available'}
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Coverage:</span>
                                <span className="ml-2 font-medium">
                                  {formatCurrency(userPolicy.policy?.coverageAmount || 0)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Premium:</span>
                                <span className="ml-2 font-medium">
                                  {formatCurrency(userPolicy.policy?.premium || 0)}/month
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="text-gray-500">Expires:</span>
                              <span className={`ml-2 font-medium ${
                                isExpired(userPolicy.expiryDate) 
                                  ? 'text-red-600'
                                  : isExpiringSoon(userPolicy.expiryDate)
                                  ? 'text-yellow-600'
                                  : 'text-gray-900'
                              }`}>
                                {formatDate(userPolicy.expiryDate)}
                                {isExpired(userPolicy.expiryDate) && ' (Expired)'}
                                {isExpiringSoon(userPolicy.expiryDate) && ' (Expiring Soon)'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            {isExpired(userPolicy.expiryDate) || isExpiringSoon(userPolicy.expiryDate) ? (
                              <button
                                onClick={() => handleRenewPolicy(userPolicy.id)}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                Renew
                              </button>
                            ) : (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Browse Policies
                </Link>
                <Link
                  to="/claims"
                  className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  File a Claim
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <p>📞 Call us: +1 (555) 123-4567</p>
                <p>📧 Email: support@insurai.com</p>
                <p>💬 Live chat available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;