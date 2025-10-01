// import React, { useState, useEffect } from 'react';
// import { policiesApi } from '../api/policiesApi';
// import PolicyCard from '../components/PolicyCard';
// import SearchBar from '../components/SearchBar';
// import { useNotifications } from '../hooks/useNotifications';

// const AdminPolicies = () => {
//   const { showSuccess, showError } = useNotifications();
//   const [policies, setPolicies] = useState([]);
//   const [filteredPolicies, setFilteredPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingPolicy, setEditingPolicy] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     premium: '',
//     coverage: '',
//     deductible: '',
//     type: ''
//   });

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredPolicies(policies);
//     } else {
//       const filtered = policies.filter(policy =>
//         policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         policy.type.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredPolicies(filtered);
//     }
//   }, [policies, searchTerm]);

//   const fetchPolicies = async () => {
//     try {
//       const data = await policiesApi.getAllPolicies();
//       setPolicies(data);
//       setFilteredPolicies(data);
//     } catch (error) {
//       console.error('Failed to fetch policies:', error);
//       showError('Failed to load policies');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const handleCreateNew = () => {
//     setEditingPolicy(null);
//     setFormData({
//       name: '',
//       description: '',
//       premium: '',
//       coverage: '',
//       deductible: '',
//       type: ''
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (policy) => {
//     setEditingPolicy(policy);
//     setFormData({
//       name: policy.name || '',
//       description: policy.description || '',
//       premium: policy.premium || '',
//       coverage: policy.coverage || '',
//       deductible: policy.deductible || '',
//       type: policy.type || ''
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (policyId) => {
//     if (!window.confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       await policiesApi.deletePolicy(policyId);
//       showSuccess('Policy deleted successfully');
//       fetchPolicies();
//     } catch (error) {
//       console.error('Failed to delete policy:', error);
//       showError('Failed to delete policy');
//     }
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const policyData = {
//         ...formData,
//         premium: parseFloat(formData.premium),
//         coverage: parseFloat(formData.coverage),
//         deductible: parseFloat(formData.deductible)
//       };

//       if (editingPolicy) {
//         await policiesApi.updatePolicy(editingPolicy.id, policyData);
//         showSuccess('Policy updated successfully');
//       } else {
//         await policiesApi.createPolicy(policyData);
//         showSuccess('Policy created successfully');
//       }
      
//       setShowModal(false);
//       fetchPolicies();
//     } catch (error) {
//       console.error('Failed to save policy:', error);
//       showError(`Failed to ${editingPolicy ? 'update' : 'create'} policy`);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingPolicy(null);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Manage Policies</h1>
//           <p className="text-gray-600">Create, edit, and manage insurance policies</p>
//         </div>
//         <button
//           onClick={handleCreateNew}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Create New Policy
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <SearchBar
//           onSearch={handleSearch}
//           placeholder="Search policies by name, description, or type..."
//           className="w-full"
//         />
//       </div>

//       {/* Policies Grid */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="spinner mb-4 mx-auto"></div>
//               <p className="text-gray-600">Loading policies...</p>
//             </div>
//           ) : filteredPolicies.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-6xl mb-4">📋</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {searchTerm ? 'No policies found' : 'No policies created'}
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 {searchTerm 
//                   ? 'Try adjusting your search terms' 
//                   : 'Create your first insurance policy to get started'}
//               </p>
//               {!searchTerm && (
//                 <button
//                   onClick={handleCreateNew}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                 >
//                   Create First Policy
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredPolicies.map((policy) => (
//                 <PolicyCard
//                   key={policy.id}
//                   policy={policy}
//                   showActions={true}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Policy Form Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center p-6 border-b">
//               <h2 className="text-xl font-semibold">
//                 {editingPolicy ? 'Edit Policy' : 'Create New Policy'}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Modal Form */}
//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                       Policy Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleFormChange}
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., Auto Insurance Premium"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//                       Policy Type *
//                     </label>
//                     <select
//                       id="type"
//                       name="type"
//                       value={formData.type}
//                       onChange={handleFormChange}
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select type</option>
//                       <option value="Auto">Auto Insurance</option>
//                       <option value="Home">Home Insurance</option>
//                       <option value="Health">Health Insurance</option>
//                       <option value="Life">Life Insurance</option>
//                       <option value="Travel">Travel Insurance</option>
//                       <option value="Business">Business Insurance</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="premium" className="block text-sm font-medium text-gray-700 mb-1">
//                       Monthly Premium ($) *
//                     </label>
//                     <input
//                       type="number"
//                       id="premium"
//                       name="premium"
//                       value={formData.premium}
//                       onChange={handleFormChange}
//                       required
//                       min="0"
//                       step="0.01"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="99.99"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="coverage" className="block text-sm font-medium text-gray-700 mb-1">
//                       Coverage Amount ($) *
//                     </label>
//                     <input
//                       type="number"
//                       id="coverage"
//                       name="coverage"
//                       value={formData.coverage}
//                       onChange={handleFormChange}
//                       required
//                       min="0"
//                       step="0.01"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="100000"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label htmlFor="deductible" className="block text-sm font-medium text-gray-700 mb-1">
//                       Deductible ($) *
//                     </label>
//                     <input
//                       type="number"
//                       id="deductible"
//                       name="deductible"
//                       value={formData.deductible}
//                       onChange={handleFormChange}
//                       required
//                       min="0"
//                       step="0.01"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="500"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                     Description *
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleFormChange}
//                     required
//                     rows="4"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Provide a detailed description of the policy coverage and benefits..."
//                   />
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   {editingPolicy ? 'Update Policy' : 'Create Policy'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPolicies;

import React, { useState, useEffect } from 'react';
import { policiesApi } from '../api/policiesApi';
import PolicyCard from '../components/PolicyCard';
import SearchBar from '../components/SearchBar';
import { useNotifications } from '../hooks/useNotifications';

const AdminPolicies = () => {
  const { showSuccess, showError } = useNotifications();
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  // FIX: Added policyNumber to formData state
  const [formData, setFormData] = useState({
    policyNumber: '',
    policyName: '',
    description: '',
    monthlyPremium: '',
    coverageAmount: '',
    deductible: '',
    policyType: ''
  });

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPolicies(policies);
    } else {
      const filtered = policies.filter(policy =>
        policy.policyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.policyType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPolicies(filtered);
    }
  }, [policies, searchTerm]);

  const fetchPolicies = async () => {
    try {
      const data = await policiesApi.getAllPolicies();
      setPolicies(data);
      setFilteredPolicies(data);
    } catch (error) {
      console.error('Failed to fetch policies:', error);
      showError('Failed to load policies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCreateNew = () => {
    setEditingPolicy(null);
    // FIX: Added policyNumber to formData reset
    setFormData({
      policyNumber: '',
      policyName: '',
      description: '',
      monthlyPremium: '',
      coverageAmount: '',
      deductible: '',
      policyType: ''
    });
    setShowModal(true);
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    // FIX: Added policyNumber to formData for editing
    setFormData({
      policyNumber: policy.policyNumber || '',
      policyName: policy.policyName || '',
      description: policy.description || '',
      monthlyPremium: policy.monthlyPremium || '',
      coverageAmount: policy.coverageAmount || '',
      deductible: policy.deductible || '',
      policyType: policy.policyType || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (policyId) => {
    if (!window.confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
      return;
    }

    try {
      await policiesApi.deletePolicy(policyId);
      showSuccess('Policy deleted successfully');
      fetchPolicies();
    } catch (error) {
      console.error('Failed to delete policy:', error);
      showError('Failed to delete policy');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to generate a simple policy number
  const generatePolicyNumber = () => {
    const timestamp = Date.now();
    return `POL-${timestamp}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // FIX: Ensure all fields are included in the request
      const policyData = {
        policyNumber: editingPolicy ? editingPolicy.policyNumber : generatePolicyNumber(),
        policyName: formData.policyName,
        policyType: formData.policyType,
        description: formData.description,
        monthlyPremium: parseFloat(formData.monthlyPremium),
        coverageAmount: parseFloat(formData.coverageAmount),
        deductible: parseFloat(formData.deductible),
        // This maps to the backend's required 'premium' field
        premium: parseFloat(formData.monthlyPremium),
      };

      if (editingPolicy) {
        await policiesApi.updatePolicy(editingPolicy.id, policyData);
        showSuccess('Policy updated successfully');
      } else {
        await policiesApi.createPolicy(policyData);
        showSuccess('Policy created successfully');
      }
      
      setShowModal(false);
      fetchPolicies();
    } catch (error) {
      console.error('Failed to save policy:', error);
      showError(`Failed to ${editingPolicy ? 'update' : 'create'} policy`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPolicy(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Policies</h1>
          <p className="text-gray-600">Create, edit, and manage insurance policies</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Policy
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search policies by name, description, or type..."
          className="w-full"
        />
      </div>

      {/* Policies Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="spinner mb-4 mx-auto"></div>
              <p className="text-gray-600">Loading policies...</p>
            </div>
          ) : filteredPolicies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No policies found' : 'No policies created'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Create your first insurance policy to get started'}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateNew}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Create First Policy
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  policy={policy}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Policy Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingPolicy ? 'Edit Policy' : 'Create New Policy'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* FIX: Add policyNumber input field */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Policy Number *
                    </label>
                    <input
                      type="text"
                      id="policyNumber"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., POL-123456"
                    />
                  </div>
                  <div>
                    <label htmlFor="policyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Policy Name *
                    </label>
                    <input
                      type="text"
                      id="policyName"
                      name="policyName"
                      value={formData.policyName}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Auto Insurance Premium"
                    />
                  </div>
                  <div>
                    <label htmlFor="policyType" className="block text-sm font-medium text-gray-700 mb-1">
                      Policy Type *
                    </label>
                    <select
                      id="policyType"
                      name="policyType"
                      value={formData.policyType}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="Auto">Auto Insurance</option>
                      <option value="Home">Home Insurance</option>
                      <option value="Health">Health Insurance</option>
                      <option value="Life">Life Insurance</option>
                      <option value="Travel">Travel Insurance</option>
                      <option value="Business">Business Insurance</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="monthlyPremium" className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Premium ($) *
                    </label>
                    <input
                      type="number"
                      id="monthlyPremium"
                      name="monthlyPremium"
                      value={formData.monthlyPremium}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="99.99"
                    />
                  </div>
                  <div>
                    <label htmlFor="coverageAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Coverage Amount ($) *
                    </label>
                    <input
                      type="number"
                      id="coverageAmount"
                      name="coverageAmount"
                      value={formData.coverageAmount}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="deductible" className="block text-sm font-medium text-gray-700 mb-1">
                      Deductible ($) *
                    </label>
                    <input
                      type="number"
                      id="deductible"
                      name="deductible"
                      value={formData.deductible}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Provide a detailed description of the policy coverage and benefits..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingPolicy ? 'Update Policy' : 'Create Policy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPolicies;