// import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';

// const Claims = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('file');
//   const [claimForm, setClaimForm] = useState({
//     policyId: '',
//     incidentDate: '',
//     description: '',
//     amount: '',
//     category: '',
//     attachments: []
//   });

//   // Mock data for existing claims
//   const mockClaims = [
//     {
//       id: 1,
//       policyName: 'Auto Insurance Premium',
//       claimNumber: 'CLM-2024-001',
//       incidentDate: '2024-01-15',
//       submissionDate: '2024-01-16',
//       amount: 2500,
//       status: 'Under Review',
//       description: 'Vehicle collision on Highway 101'
//     },
//     {
//       id: 2,
//       policyName: 'Home Insurance Standard',
//       claimNumber: 'CLM-2024-002',
//       incidentDate: '2023-12-28',
//       submissionDate: '2023-12-29',
//       amount: 1800,
//       status: 'Approved',
//       description: 'Water damage from burst pipe'
//     },
//     {
//       id: 3,
//       policyName: 'Health Insurance Plus',
//       claimNumber: 'CLM-2024-003',
//       incidentDate: '2024-02-10',
//       submissionDate: '2024-02-11',
//       amount: 450,
//       status: 'Paid',
//       description: 'Emergency room visit'
//     }
//   ];

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setClaimForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setClaimForm(prev => ({
//       ...prev,
//       attachments: files
//     }));
//   };

//   const handleSubmitClaim = (e) => {
//     e.preventDefault();
//     // This is a placeholder - in a real app, this would submit to the backend
//     alert('Claim submitted successfully! This is a demo - no actual claim was filed.');
//     setClaimForm({
//       policyId: '',
//       incidentDate: '',
//       description: '',
//       amount: '',
//       category: '',
//       attachments: []
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Under Review':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Approved':
//         return 'bg-green-100 text-green-800';
//       case 'Paid':
//         return 'bg-blue-100 text-blue-800';
//       case 'Rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
//           <p className="text-gray-600">File new claims and track existing ones</p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex">
//               <button
//                 onClick={() => setActiveTab('file')}
//                 className={`py-4 px-6 text-sm font-medium border-b-2 ${
//                   activeTab === 'file'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 File New Claim
//               </button>
//               <button
//                 onClick={() => setActiveTab('track')}
//                 className={`py-4 px-6 text-sm font-medium border-b-2 ${
//                   activeTab === 'track'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Track Claims
//               </button>
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === 'file' && (
//               <div>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-2">File a New Claim</h2>
//                   <p className="text-gray-600">
//                     Please provide detailed information about your incident to help us process your claim quickly.
//                   </p>
//                 </div>

//                 <form onSubmit={handleSubmitClaim} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="policyId" className="block text-sm font-medium text-gray-700 mb-2">
//                         Policy *
//                       </label>
//                       <select
//                         id="policyId"
//                         name="policyId"
//                         value={claimForm.policyId}
//                         onChange={handleFormChange}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">Select a policy</option>
//                         <option value="auto-001">Auto Insurance Premium</option>
//                         <option value="home-001">Home Insurance Standard</option>
//                         <option value="health-001">Health Insurance Plus</option>
//                         <option value="life-001">Life Insurance Basic</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
//                         Claim Category *
//                       </label>
//                       <select
//                         id="category"
//                         name="category"
//                         value={claimForm.category}
//                         onChange={handleFormChange}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">Select category</option>
//                         <option value="accident">Accident</option>
//                         <option value="theft">Theft</option>
//                         <option value="damage">Property Damage</option>
//                         <option value="medical">Medical</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-2">
//                         Incident Date *
//                       </label>
//                       <input
//                         type="date"
//                         id="incidentDate"
//                         name="incidentDate"
//                         value={claimForm.incidentDate}
//                         onChange={handleFormChange}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
//                         Claim Amount *
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <span className="text-gray-500 sm:text-sm">$</span>
//                         </div>
//                         <input
//                           type="number"
//                           id="amount"
//                           name="amount"
//                           value={claimForm.amount}
//                           onChange={handleFormChange}
//                           required
//                           min="0"
//                           step="0.01"
//                           className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="0.00"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                       Incident Description *
//                     </label>
//                     <textarea
//                       id="description"
//                       name="description"
//                       value={claimForm.description}
//                       onChange={handleFormChange}
//                       required
//                       rows="4"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Please provide a detailed description of what happened..."
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
//                       Supporting Documents
//                     </label>
//                     <input
//                       type="file"
//                       id="attachments"
//                       name="attachments"
//                       onChange={handleFileChange}
//                       multiple
//                       accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     <p className="mt-1 text-sm text-gray-500">
//                       Upload photos, receipts, police reports, or other relevant documents (PDF, JPG, PNG, DOC)
//                     </p>
//                   </div>

//                   <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//                     <div className="flex">
//                       <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                       </svg>
//                       <div>
//                         <h3 className="text-sm font-medium text-blue-800">Claims Processing Notice</h3>
//                         <p className="text-sm text-blue-700 mt-1">
//                           This is a demo application. Claims submitted here will not be processed. 
//                           In a production environment, this would integrate with your backend claims processing system.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end">
//                     <button
//                       type="submit"
//                       className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                       Submit Claim
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {activeTab === 'track' && (
//               <div>
//                 <div className="mb-6">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Claims</h2>
//                   <p className="text-gray-600">
//                     Track the status of your submitted claims and view claim history.
//                   </p>
//                 </div>

//                 {mockClaims.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="text-gray-400 text-6xl mb-4">📋</div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">No Claims Found</h3>
//                     <p className="text-gray-600 mb-4">You haven't filed any claims yet.</p>
//                     <button
//                       onClick={() => setActiveTab('file')}
//                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                     >
//                       File Your First Claim
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {mockClaims.map((claim) => (
//                       <div key={claim.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
//                         <div className="flex justify-between items-start mb-4">
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-900">{claim.policyName}</h3>
//                             <p className="text-sm text-gray-600">Claim #{claim.claimNumber}</p>
//                           </div>
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
//                             {claim.status}
//                           </span>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//                           <div>
//                             <p className="text-sm font-medium text-gray-500">Incident Date</p>
//                             <p className="text-sm text-gray-900">{formatDate(claim.incidentDate)}</p>
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-500">Submitted</p>
//                             <p className="text-sm text-gray-900">{formatDate(claim.submissionDate)}</p>
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-500">Claim Amount</p>
//                             <p className="text-sm text-gray-900">{formatCurrency(claim.amount)}</p>
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-500">Status</p>
//                             <p className="text-sm text-gray-900">{claim.status}</p>
//                           </div>
//                         </div>

//                         <div className="mb-4">
//                           <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
//                           <p className="text-sm text-gray-900">{claim.description}</p>
//                         </div>

//                         <div className="flex justify-end space-x-3">
//                           <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                             View Details
//                           </button>
//                           {claim.status === 'Under Review' && (
//                             <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                               Add Documents
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
//                   <div className="flex">
//                     <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     <div>
//                       <h3 className="text-sm font-medium text-yellow-800">Demo Data Notice</h3>
//                       <p className="text-sm text-yellow-700 mt-1">
//                         The claims shown above are mock data for demonstration purposes. 
//                         In a real application, this would display actual claims from your backend API.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Help Section */}
//         <div className="mt-8 bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help with Your Claim?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="text-center">
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//               </div>
//               <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
//               <p className="text-sm text-gray-600 mb-2">Speak with a claims specialist</p>
//               <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
//             </div>

//             <div className="text-center">
//               <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//               <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
//               <p className="text-sm text-gray-600 mb-2">Chat with our support team</p>
//               <button className="text-blue-600 font-medium hover:text-blue-800">Start Chat</button>
//             </div>

//             <div className="text-center">
//               <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
//               <p className="text-sm text-gray-600 mb-2">Send us your questions</p>
//               <p className="text-blue-600 font-medium">claims@insurai.com</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Claims;

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';

const API_BASE_URL = 'http://localhost:8080/api';

const Claims = () => {
    const { user } = useAuth(); 
    
    const [activeTab, setActiveTab] = useState('file');
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);

    const [claimForm, setClaimForm] = useState({
        policyId: '',
        incidentDate: '',
        description: '',
        amount: '',
        category: '',
    });

    // Get token directly from localStorage
    const getToken = () => {
        return localStorage.getItem('token');
    };

    const fetchClaims = useCallback(async () => {
        const token = getToken();
        
        if (!token) {
            setError("Please log in to view your claims.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            console.log('Fetching claims with token:', token.substring(0, 20) + '...');
            
            const response = await fetch(`${API_BASE_URL}/claims/my-claims`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers.get('content-type'));

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Authentication failed. Please log in again.");
                }
                const errorText = await response.text();
                console.error('Error response:', errorText);
                
                if (errorText.startsWith("<!DOCTYPE") || errorText.startsWith("<html")) {
                    throw new Error("Authentication failed. Server returned HTML instead of JSON. Please log in again.");
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error("Server returned invalid format. Expected JSON.");
            }

            const data = await response.json();
            console.log('Claims fetched successfully:', data);
            setClaims(data);
        } catch (err) {
            console.error("Failed to fetch claims:", err);
            setError(err.message || "Failed to load claims. Check your server connection.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'track') {
            fetchClaims();
        }
    }, [activeTab, fetchClaims]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setClaimForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitClaim = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        setError(null);

        const token = getToken();
        
        if (!token) {
            setError("You must be logged in to submit a claim.");
            setSubmitStatus('error');
            return;
        }

        const submissionData = {
            policyId: claimForm.policyId,
            incidentDate: claimForm.incidentDate,
            description: claimForm.description,
            amount: parseFloat(claimForm.amount), 
            category: claimForm.category.toUpperCase(), 
        };

        console.log('Submitting claim:', submissionData);
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/claims/file`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(submissionData),
            });

            console.log('Submit response status:', response.status);

            if (response.ok) {
                const result = await response.json();
                console.log('Claim submitted successfully:', result);
                setSubmitStatus('success');
                setClaimForm({ policyId: '', incidentDate: '', description: '', amount: '', category: '' });
                
                setTimeout(() => {
                    setActiveTab('track');
                    setSubmitStatus(null);
                }, 2000);
            } else {
                const errorText = await response.text();
                console.error('Submit error response:', errorText);
                
                try {
                    const errorData = JSON.parse(errorText);
                    setError(errorData.message || 'Claim submission failed due to validation or server error.');
                } catch {
                    setError(`Claim submission failed. Status: ${response.status}.`);
                }
                setSubmitStatus('error');
            }
        } catch (err) {
            console.error("Submission Error:", err);
            setError('Network error: Could not connect to the claims service.');
            setSubmitStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'SUBMITTED':
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
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
                    <p className="text-gray-600">File new claims and track existing ones</p>
                    {error && <div className="mt-4 p-3 bg-red-100 text-red-800 rounded border border-red-200">{error}</div>}
                    {submitStatus === 'success' && <div className="mt-4 p-3 bg-green-100 text-green-800 rounded border border-green-200">Claim successfully submitted! Redirecting...</div>}
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex">
                            <button
                                onClick={() => setActiveTab('file')}
                                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                    activeTab === 'file'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                File New Claim
                            </button>
                            <button
                                onClick={() => setActiveTab('track')}
                                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                    activeTab === 'track'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Track Claims {claims.length > 0 && `(${claims.length})`}
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'file' && (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">File a New Claim</h2>
                                    <p className="text-gray-600">
                                        Please provide detailed information about your incident.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="policyId" className="block text-sm font-medium text-gray-700 mb-2">Policy *</label>
                                            <select
                                                id="policyId" 
                                                name="policyId" 
                                                value={claimForm.policyId} 
                                                onChange={handleFormChange} 
                                                disabled={loading}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                            >
                                                <option value="">Select a policy</option>
                                                <option value="AUT-001">Auto Insurance Premium</option>
                                                <option value="HME-001">Home Insurance Standard</option>
                                                <option value="HLT-001">Health Insurance Plus</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Claim Category *</label>
                                            <select
                                                id="category" 
                                                name="category" 
                                                value={claimForm.category} 
                                                onChange={handleFormChange}
                                                disabled={loading}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                            >
                                                <option value="">Select category</option>
                                                <option value="ACCIDENT">Accident</option>
                                                <option value="THEFT">Theft</option>
                                                <option value="DAMAGE">Property Damage</option>
                                                <option value="MEDICAL">Medical</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-2">Incident Date *</label>
                                            <input
                                                type="date" 
                                                id="incidentDate" 
                                                name="incidentDate" 
                                                value={claimForm.incidentDate} 
                                                onChange={handleFormChange}
                                                disabled={loading}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Claim Amount *</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">$</span>
                                                </div>
                                                <input
                                                    type="number" 
                                                    id="amount" 
                                                    name="amount" 
                                                    value={claimForm.amount} 
                                                    onChange={handleFormChange} 
                                                    min="0" 
                                                    step="0.01"
                                                    disabled={loading}
                                                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Incident Description *</label>
                                        <textarea
                                            id="description" 
                                            name="description" 
                                            value={claimForm.description} 
                                            onChange={handleFormChange} 
                                            rows={4}
                                            disabled={loading}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                            placeholder="Please provide a detailed description of what happened..."
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleSubmitClaim}
                                            disabled={loading || !getToken() || !claimForm.policyId || !claimForm.category || !claimForm.incidentDate || !claimForm.amount || !claimForm.description}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Submitting...' : 'Submit Claim'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'track' && (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Claims</h2>
                                    <p className="text-gray-600">
                                        Track the status of your submitted claims and view the Admin's decision.
                                    </p>
                                </div>

                                {loading && (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                        <p className="text-gray-600 mt-4">Loading claims...</p>
                                    </div>
                                )}
                                
                                {!loading && claims.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-6xl mb-4">📋</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Claims Found</h3>
                                        <p className="text-gray-600 mb-4">You haven't filed any claims yet.</p>
                                        <button
                                            onClick={() => setActiveTab('file')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                        >
                                            File Your First Claim
                                        </button>
                                    </div>
                                )}

                                {!loading && claims.length > 0 && (
                                    <div className="space-y-4">
                                        {claims.map((claim) => (
                                            <div key={claim.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{claim.policyName || claim.policyId}</h3>
                                                        <p className="text-sm text-gray-600">Claim #{claim.claimNumber || claim.id}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
                                                        {claim.status.replace('_', ' ')}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Incident Date</p>
                                                        <p className="text-sm text-gray-900">{formatDate(claim.incidentDate)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Submitted</p>
                                                        <p className="text-sm text-gray-900">{formatDate(claim.submissionDate || claim.createdAt)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Claim Amount</p>
                                                        <p className="text-sm text-gray-900">{formatCurrency(claim.amount)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Category</p>
                                                        <p className="text-sm text-gray-900">{claim.category}</p>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                                                    <p className="text-sm text-gray-900">{claim.description}</p>
                                                </div>
                                                
                                                {(claim.status === 'APPROVED' || claim.status === 'REJECTED') && claim.adminNotes && (
                                                    <div className={`mt-4 p-3 rounded-md ${claim.status === 'APPROVED' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                                        <p className="text-sm font-semibold text-gray-700">Admin Decision ({claim.status.replace('_', ' ')}):</p>
                                                        <p className="text-sm text-gray-700 mt-1">{claim.adminNotes}</p>
                                                    </div>
                                                )}
                                                
                                                {claim.status === 'SUBMITTED' && (
                                                    <div className="mt-4 p-3 bg-gray-50 border border-gray-300 rounded-md">
                                                        <p className="text-sm text-gray-600">Your claim is currently awaiting review by a claims specialist.</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help with Your Claim?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                            <p className="text-sm text-gray-600 mb-2">Speak with a claims specialist</p>
                            <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                            <p className="text-sm text-gray-600 mb-2">Chat with our support team</p>
                            <button className="text-blue-600 font-medium hover:text-blue-800">Start Chat</button>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                            <p className="text-sm text-gray-600 mb-2">Send us your questions</p>
                            <p className="text-blue-600 font-medium">claims@insurai.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Claims;