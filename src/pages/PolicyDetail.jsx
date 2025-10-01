import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { policiesApi } from '../api/policiesApi';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

const PolicyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchPolicy();
  }, [id]);

  const fetchPolicy = async () => {
    try {
      const data = await policiesApi.getPolicyById(id);
      setPolicy(data);
    } catch (error) {
      console.error('Failed to fetch policy:', error);
      showError('Failed to load policy details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    if (!user) {
      navigate('/login', { state: { from: `/policy/${id}` } });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePurchaseSuccess = () => {
    showSuccess('Policy purchased successfully!');
    navigate('/dashboard');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading policy details...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Policy Not Found</h1>
          <p className="text-gray-600 mb-4">The policy you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Browse Policies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Policies
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{policy.name}</h1>
                <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">
                  {policy.type || 'Insurance Policy'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{formatCurrency(policy.premium)}</div>
                <div className="text-blue-200">per month</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Policy Description</h2>
              <p className="text-gray-700 leading-relaxed">{policy.description}</p>
            </div>

            {/* Coverage Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Coverage Amount</h3>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(policy.coverage)}</p>
                <p className="text-sm text-green-700 mt-1">Maximum benefit</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Monthly Premium</h3>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(policy.premium)}</p>
                <p className="text-sm text-blue-700 mt-1">Monthly payment</p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Deductible</h3>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(policy.deductible)}</p>
                <p className="text-sm text-orange-700 mt-1">Per claim</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'AI-powered claim processing',
                  '24/7 customer support',
                  'Mobile app access',
                  'Online policy management',
                  'Flexible payment options',
                  'Quick claim settlements',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Policy becomes effective immediately after payment confirmation</li>
                <li>• Coverage period is 12 months from the purchase date</li>
                <li>• Claims must be filed within 30 days of the incident</li>
                <li>• Pre-existing conditions may not be covered (refer to policy document)</li>
                <li>• Premium payments are due monthly and must be paid on time</li>
                <li>• Policy can be cancelled with 30 days written notice</li>
              </ul>
            </div>

            {/* Purchase Button */}
            <div className="flex justify-center">
              <button
                onClick={handlePurchase}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {user ? `Purchase for ${formatCurrency(policy.premium)}/month` : 'Sign In to Purchase'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        policy={policy}
        onSuccess={handlePurchaseSuccess}
      />
    </div>
  );
};

export default PolicyDetail;