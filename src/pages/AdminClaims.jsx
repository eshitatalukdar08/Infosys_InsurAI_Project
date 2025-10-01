// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useNotifications } from '../hooks/useNotifications';

// const API_BASE_URL = 'http://localhost:8080/api/admin/claims';

// // Component for the decision modal
// const DecisionModal = ({ claim, onClose, onDecisionSubmit }) => {
//     const [status, setStatus] = useState('');
//     const [notes, setNotes] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!status) return;
        
//         // Enforce notes for final decisions
//         if ((status === 'APPROVED' || status === 'REJECTED') && notes.trim() === '') {
//             alert(`Explanation is required for ${status}.`);
//             return;
//         }

//         setIsSubmitting(true);
//         onDecisionSubmit(claim.id, status, notes)
//             .finally(() => setIsSubmitting(false));
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg max-w-lg w-full">
//                 <div className="p-6">
//                     <h2 className="text-xl font-bold mb-4">Review Claim #{claim.claimNumber}</h2>
//                     <p className="text-sm text-gray-700 mb-4">
//                         **Filed by:** {claim.insuredUsername} ({claim.insuredEmail})
//                     </p>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Set Status *</label>
//                             <select
//                                 value={status}
//                                 onChange={(e) => setStatus(e.target.value)}
//                                 required
//                                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
//                             >
//                                 <option value="">Select Action</option>
//                                 <option value="UNDER_REVIEW">Keep Under Review</option>
//                                 <option value="APPROVED">Approve</option>
//                                 <option value="REJECTED">Reject</option>
//                             </select>
//                         </div>
                        
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Explanation/Notes *</label>
//                             <textarea
//                                 value={notes}
//                                 onChange={(e) => setNotes(e.target.value)}
//                                 required={status === 'APPROVED' || status === 'REJECTED'}
//                                 rows="3"
//                                 placeholder="Explain the reason for approval or rejection."
//                                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
//                             />
//                         </div>

//                         <div className="flex justify-end space-x-3 pt-4 border-t">
//                             <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
//                                 Cancel
//                             </button>
//                             <button type="submit" disabled={!status || isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
//                                 {isSubmitting ? 'Processing...' : 'Submit Decision'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };


// const AdminClaims = () => {
//     const { token } = useAuth();
//     const { showSuccess, showError } = useNotifications();
//     const [claims, setClaims] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedClaim, setSelectedClaim] = useState(null);

//     const fetchClaims = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(API_BASE_URL, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch claims. Status: ${response.status}`);
//             }

//             const data = await response.json();
//             setClaims(data);
//         } catch (error) {
//             console.error('Claims Fetch Error:', error);
//             showError('Failed to load claims for review.');
//         } finally {
//             setLoading(false);
//         }
//     }, [token, showError]);

//     useEffect(() => {
//         if (token) {
//             fetchClaims();
//         }
//     }, [token, fetchClaims]);

//     const handleDecisionSubmit = async (claimId, newStatus, adminNotes) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/${claimId}/decision`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ newStatus, adminNotes }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Decision submission failed.');
//             }

//             showSuccess(`Claim ${claimId} successfully updated to ${newStatus}.`);
//             setSelectedClaim(null); // Close modal
//             fetchClaims(); // Refresh the list
//             return true;

//         } catch (error) {
//             console.error('Decision Error:', error);
//             showError(error.message);
//             return false;
//         }
//     };
    
//     // UI Helpers
//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'SUBMITTED':
//                 return 'bg-blue-100 text-blue-800';
//             case 'UNDER_REVIEW':
//                 return 'bg-yellow-100 text-yellow-800';
//             case 'APPROVED':
//                 return 'bg-green-100 text-green-800';
//             case 'REJECTED':
//                 return 'bg-red-100 text-red-800';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };

//     if (loading) {
//         return <div className="flex items-center justify-center py-12 text-gray-600">Loading claims for review...</div>;
//     }

//     return (
//         <div className="space-y-6">
//             <h1 className="text-2xl font-bold text-gray-900">Claims Review ({claims.length})</h1>
//             <p className="text-gray-600">Review and process claims filed by users. User details are attached for verification.</p>

//             <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim #</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Info</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident Date</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {claims.length === 0 ? (
//                                 <tr><td colSpan="6" className="text-center py-4 text-gray-500">No new claims to review.</td></tr>
//                             ) : (
//                                 claims.map((claim) => (
//                                     <tr key={claim.id} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm font-medium text-gray-900">{claim.claimNumber}</div>
//                                             <div className="text-xs text-gray-500">{claim.policyId} ({claim.category})</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm font-medium text-gray-900">{claim.insuredUsername || 'ID: ' + claim.insuredId}</div>
//                                             <div className="text-xs text-gray-500">{claim.insuredEmail}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(claim.amount)}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.incidentDate}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(claim.status)}`}>
//                                                 {claim.status.replace('_', ' ')}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <button
//                                                 onClick={() => setSelectedClaim(claim)}
//                                                 className="text-blue-600 hover:text-blue-900 font-semibold"
//                                             >
//                                                 Review/Decide
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
            
//             {/* Decision Modal */}
//             {selectedClaim && (
//                 <DecisionModal 
//                     claim={selectedClaim}
//                     onClose={() => setSelectedClaim(null)}
//                     onDecisionSubmit={handleDecisionSubmit}
//                 />
//             )}
//         </div>
//     );
// };

// export default AdminClaims;


import React, { useState, useEffect } from 'react';
import { adminClaimsApi } from '../api/adminClaimsApi';
import { useNotifications } from '../hooks/useNotifications';

const AdminClaims = () => {
  const { showSuccess, showError } = useNotifications();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [modalData, setModalData] = useState({
    status: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch claims on mount
  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    setLoading(true);
    try {
      const data = await adminClaimsApi.getAllClaims();
      setClaims(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Load claims error:', error);
      const errorMsg = error.response?.status === 403 
        ? 'Access denied. Please ensure you are logged in as an admin.'
        : error.response?.data?.message || 'Failed to load claims';
      showError(errorMsg);
      setClaims([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter claims based on search
  const filteredClaims = claims.filter(claim => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      claim.claimNumber?.toLowerCase().includes(search) ||
      claim.insuredUsername?.toLowerCase().includes(search) ||
      claim.insuredEmail?.toLowerCase().includes(search) ||
      claim.status?.toLowerCase().includes(search) ||
      claim.category?.toLowerCase().includes(search)
    );
  });

  const openModal = (claim) => {
    setSelectedClaim(claim);
    setModalData({
      status: claim.status || 'SUBMITTED',
      notes: claim.adminNotes || ''
    });
  };

  const closeModal = () => {
    setSelectedClaim(null);
    setModalData({ status: '', notes: '' });
  };

  const handleSubmitDecision = async (e) => {
    e.preventDefault();

    // Validation
    if (!modalData.status) {
      showError('Please select a status');
      return;
    }

    if ((modalData.status === 'APPROVED' || modalData.status === 'REJECTED') && !modalData.notes.trim()) {
      showError(`Notes are required when ${modalData.status === 'APPROVED' ? 'approving' : 'rejecting'} a claim`);
      return;
    }

    setSubmitting(true);
    try {
      const requestBody = {
        newStatus: modalData.status,
        adminNotes: modalData.notes.trim()
      };

      await adminClaimsApi.updateClaimDecision(selectedClaim.id, requestBody);
      showSuccess(`Claim ${selectedClaim.claimNumber} updated successfully`);
      closeModal();
      loadClaims(); // Refresh list
    } catch (error) {
      console.error('Submit decision error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to update claim';
      showError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading claims...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
        <p className="mt-2 text-gray-600">Review and manage insurance claims</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by claim number, user, email, status, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Claims Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredClaims.length} of {claims.length} claims
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredClaims.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {searchTerm ? 'No claims found' : 'No claims available'}
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm ? 'Try a different search term' : 'Claims will appear here when users submit them'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {claim.claimNumber || `#${claim.id}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {claim.category} • Policy: {claim.policyId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {claim.insuredUsername || `User ${claim.insuredId}`}
                      </div>
                      <div className="text-xs text-gray-500">{claim.insuredEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(claim.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.incidentDate || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(claim.status)}`}>
                        {claim.status?.replace('_', ' ') || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => openModal(claim)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Review →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Decision Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Review Claim {selectedClaim.claimNumber}
              </h2>
              <button
                onClick={closeModal}
                disabled={submitting}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-6">
              {/* Claim Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Insured User</label>
                  <p className="text-base font-semibold text-gray-900">
                    {selectedClaim.insuredUsername || `User ${selectedClaim.insuredId}`}
                  </p>
                  <p className="text-sm text-gray-500">{selectedClaim.insuredEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Policy Details</label>
                  <p className="text-base text-gray-900">Policy ID: {selectedClaim.policyId}</p>
                  <p className="text-sm text-gray-500">Category: {selectedClaim.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Claim Amount</label>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(selectedClaim.amount)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Incident Date</label>
                  <p className="text-base text-gray-900">{selectedClaim.incidentDate || 'Not specified'}</p>
                </div>
              </div>

              {/* Description */}
              {selectedClaim.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Claim Description</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedClaim.description}</p>
                  </div>
                </div>
              )}

              {/* Decision Form */}
              <form onSubmit={handleSubmitDecision} className="space-y-6 pt-6 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Decision Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={modalData.status}
                    onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-- Select Decision --</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approve Claim</option>
                    <option value="REJECTED">Reject Claim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes / Explanation
                    {(modalData.status === 'APPROVED' || modalData.status === 'REJECTED') && (
                      <span className="text-red-500"> *</span>
                    )}
                  </label>
                  <textarea
                    value={modalData.notes}
                    onChange={(e) => setModalData({ ...modalData, notes: e.target.value })}
                    required={modalData.status === 'APPROVED' || modalData.status === 'REJECTED'}
                    disabled={submitting}
                    rows={5}
                    placeholder="Provide detailed explanation for your decision. This will be visible to the user."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    ℹ️ Required for approval or rejection. The user will see this explanation.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !modalData.status}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {submitting ? 'Submitting...' : 'Submit Decision'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClaims;