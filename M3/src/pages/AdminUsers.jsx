// import React, { useState, useEffect } from 'react';
// import { usersApi } from '../api/usersApi';
// import { userPoliciesApi } from '../api/userPoliciesApi';
// import SearchBar from '../components/SearchBar';
// import { useNotifications } from '../hooks/useNotifications';

// const AdminUsers = () => {
//   const { showSuccess, showError } = useNotifications();
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [userPolicies, setUserPolicies] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'user'
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredUsers(users);
//     } else {
//       const filtered = users.filter(user =>
//         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         user.role.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredUsers(filtered);
//     }
//   }, [users, searchTerm]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch all user-policy relationships
//       const allUserPolicies = await userPoliciesApi.getAllUserPolicies();
      
//       // Extract unique users and their policies
//       const usersMap = new Map();
//       const policiesMap = {};
      
//       allUserPolicies.forEach(userPolicy => {
//         const user = userPolicy.user;
//         const policy = userPolicy.policy;
        
//         // Add user to map if not already present
//         if (!usersMap.has(user.id)) {
//           usersMap.set(user.id, {
//             id: user.id,
//             username: user.username,
//             email: user.email || `${user.username}@example.com`, // Fallback email
//             role: user.role.toLowerCase(), // Normalize role to lowercase
//             createdAt: null, // Not available in the API response
//             lastLogin: null, // Not available in the API response
//             status: 'active' // Default status since not available in API
//           });
//           policiesMap[user.id] = [];
//         }
        
//         // Add policy to user's policy list
//         policiesMap[user.id].push({
//           id: userPolicy.id,
//           policy: {
//             id: policy.id,
//             name: policy.policyName,
//             number: policy.policyNumber,
//             type: policy.policyType,
//             premium: policy.premium,
//             description: policy.description
//           },
//           purchaseDate: userPolicy.purchaseDate,
//           expiryDate: userPolicy.expiryDate,
//           active: userPolicy.active
//         });
//       });
      
//       const uniqueUsers = Array.from(usersMap.values());
      
//       setUsers(uniqueUsers);
//       setFilteredUsers(uniqueUsers);
//       setUserPolicies(policiesMap);
      
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//       showError('Failed to load users: ' + (error.response?.data?.message || error.message));
//       setUsers([]);
//       setFilteredUsers([]);
//       setUserPolicies({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const handleViewUser = (user) => {
//     setSelectedUser(user);
//   };

//   const handleCreateNew = () => {
//     setEditingUser(null);
//     setFormData({
//       username: '',
//       email: '',
//       password: '',
//       role: 'user'
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormData({
//       username: user.username || '',
//       email: user.email || '',
//       password: '', // Don't pre-fill password
//       role: user.role || 'user'
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (userId) => {
//     if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       await usersApi.deleteUser(userId);
//       showSuccess('User deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//       showError('Failed to delete user: ' + (error.response?.data?.message || error.message));
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
    
//     // Basic validation
//     if (!formData.username.trim()) {
//       showError('Username is required');
//       return;
//     }
    
//     if (!editingUser && !formData.password.trim()) {
//       showError('Password is required for new users');
//       return;
//     }
    
//     try {
//       const submitData = { ...formData };
      
//       // Remove empty password for updates
//       if (editingUser && !submitData.password.trim()) {
//         delete submitData.password;
//       }
      
//       if (editingUser) {
//         await usersApi.updateUser(editingUser.id, submitData);
//         showSuccess('User updated successfully');
//       } else {
//         await usersApi.createUser(submitData);
//         showSuccess('User created successfully');
//       }
      
//       setShowModal(false);
//       fetchUsers();
//     } catch (error) {
//       console.error('Failed to save user:', error);
//       const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
//       showError(`Failed to ${editingUser ? 'update' : 'create'} user: ${errorMessage}`);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingUser(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not available';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       });
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'bg-green-100 text-green-800';
//       case 'inactive':
//         return 'bg-gray-100 text-gray-800';
//       case 'suspended':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getRoleColor = (role) => {
//     switch (role?.toLowerCase()) {
//       case 'admin':
//       case 'administrator':
//         return 'bg-purple-100 text-purple-800';
//       case 'user':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPolicyCount = (userId) => {
//     const policies = userPolicies[userId];
//     return Array.isArray(policies) ? policies.length : 0;
//   };

//   const getTotalPremium = (userId) => {
//     const policies = userPolicies[userId];
//     if (!Array.isArray(policies)) return 0;
    
//     return policies.reduce((total, userPolicy) => {
//       return total + (userPolicy.policy?.premium || 0);
//     }, 0);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
//           <p className="text-gray-600">View and manage user accounts and their policies</p>
//         </div>
//         <button
//           onClick={handleCreateNew}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Create New User
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <SearchBar
//           onSearch={handleSearch}
//           placeholder="Search users by username, email, or role..."
//           className="w-full"
//         />
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
//             <p className="text-gray-600">Loading users...</p>
//           </div>
//         ) : filteredUsers.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-6xl mb-4">👥</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               {searchTerm ? 'No users found' : 'No users available'}
//             </h3>
//             <p className="text-gray-600 mb-4">
//               {searchTerm 
//                 ? 'Try adjusting your search terms' 
//                 : 'Users will appear here when they purchase policies'}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Policies
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Total Premium
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredUsers.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                           <span className="text-white font-medium text-sm">
//                             {user.username?.charAt(0).toUpperCase() || '?'}
//                           </span>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{user.username || 'Unknown'}</div>
//                           <div className="text-sm text-gray-500">{user.email || 'No email'}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
//                         {user.role || 'Unknown'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
//                         {user.status || 'Unknown'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {getPolicyCount(user.id)} policies
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       ${getTotalPremium(user.id).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end space-x-2">
//                         <button
//                           onClick={() => handleViewUser(user)}
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleEdit(user)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user.id)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* User Details Modal */}
//       {selectedUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//             <div className="flex justify-between items-center p-6 border-b">
//               <h2 className="text-xl font-semibold">User Details</h2>
//               <button
//                 onClick={() => setSelectedUser(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Username</h3>
//                   <p className="text-sm text-gray-900">{selectedUser.username}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Email</h3>
//                   <p className="text-sm text-gray-900">{selectedUser.email}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Role</h3>
//                   <p className="text-sm text-gray-900">{selectedUser.role}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Status</h3>
//                   <p className="text-sm text-gray-900">{selectedUser.status}</p>
//                 </div>
//               </div>
              
//               <div className="mt-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">User Policies</h3>
//                 {userPolicies[selectedUser.id] && userPolicies[selectedUser.id].length > 0 ? (
//                   <div className="space-y-4">
//                     {userPolicies[selectedUser.id].map((userPolicy, index) => (
//                       <div key={index} className="bg-gray-50 p-4 rounded-lg border">
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h4 className="text-sm font-medium text-gray-900">
//                               {userPolicy.policy?.name || 'Unknown Policy'}
//                             </h4>
//                             <p className="text-xs text-gray-500">
//                               Policy Number: {userPolicy.policy?.number || 'N/A'}
//                             </p>
//                           </div>
//                           <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                             userPolicy.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                           }`}>
//                             {userPolicy.active ? 'Active' : 'Inactive'}
//                           </span>
//                         </div>
                        
//                         <p className="text-sm text-gray-600 mb-3">
//                           {userPolicy.policy?.description || 'No description available'}
//                         </p>
                        
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
//                           <div>
//                             <span className="text-gray-500">Premium:</span>
//                             <p className="font-medium">${userPolicy.policy?.premium?.toLocaleString() || '0'}</p>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Purchase Date:</span>
//                             <p className="font-medium">{formatDate(userPolicy.purchaseDate)}</p>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Expiry Date:</span>
//                             <p className="font-medium">{formatDate(userPolicy.expiryDate)}</p>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Days Remaining:</span>
//                             <p className="font-medium">
//                               {userPolicy.expiryDate 
//                                 ? Math.max(0, Math.ceil((new Date(userPolicy.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)))
//                                 : 'N/A'
//                               }
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500">No policies purchased</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Form Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full">
//             <div className="flex justify-between items-center p-6 border-b">
//               <h2 className="text-xl font-semibold">
//                 {editingUser ? 'Edit User' : 'Create New User'}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                     Username *
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleFormChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter username"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter email address"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password {editingUser ? '' : '*'}
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleFormChange}
//                     required={!editingUser}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
//                     Role *
//                   </label>
//                   <select
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleFormChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Administrator</option>
//                   </select>
//                 </div>
//               </div>

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
//                   {editingUser ? 'Update User' : 'Create User'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;

import React, { useState, useEffect } from 'react';
import { usersApi } from '../api/usersApi';
import { userPoliciesApi } from '../api/userPoliciesApi';
import SearchBar from '../components/SearchBar';
import { useNotifications } from '../hooks/useNotifications';

const AdminUsers = () => {
  const { showSuccess, showError } = useNotifications();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userPolicies, setUserPolicies] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all user-policy relationships
      const allUserPolicies = await userPoliciesApi.getAllUserPolicies();
      
      // Extract unique users and their policies
      const usersMap = new Map();
      const policiesMap = {};
      
      allUserPolicies.forEach(userPolicy => {
        const user = userPolicy.user;
        const policy = userPolicy.policy;
        
        // Add user to map if not already present
        if (!usersMap.has(user.id)) {
          usersMap.set(user.id, {
            id: user.id,
            username: user.username,
            email: user.email || `${user.username}@example.com`, // Fallback email
            role: user.role.toLowerCase(), // Normalize role to lowercase
            createdAt: null, // Not available in the API response
            lastLogin: null, // Not available in the API response
            status: 'active' // Default status since not available in API
          });
          policiesMap[user.id] = [];
        }
        
        // Add policy to user's policy list
        policiesMap[user.id].push({
          id: userPolicy.id,
          policy: {
            id: policy.id,
            name: policy.policyName,
            number: policy.policyNumber,
            type: policy.policyType,
            premium: policy.premium,
            description: policy.description
          },
          purchaseDate: userPolicy.purchaseDate,
          expiryDate: userPolicy.expiryDate,
          active: userPolicy.active
        });
      });
      
      const uniqueUsers = Array.from(usersMap.values());
      
      setUsers(uniqueUsers);
      setFilteredUsers(uniqueUsers);
      setUserPolicies(policiesMap);
      
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showError('Failed to load users: ' + (error.response?.data?.message || error.message));
      setUsers([]);
      setFilteredUsers([]);
      setUserPolicies({});
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username || '',
      email: user.email || '',
      password: '', // Don't pre-fill password
      role: user.role || 'user'
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await usersApi.deleteUser(userId);
      showSuccess('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
      showError('Failed to delete user: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim()) {
      showError('Username is required');
      return;
    }
    
    try {
      const submitData = { ...formData };
      
      // Remove empty password for updates
      if (!submitData.password.trim()) {
        delete submitData.password;
      }
      
      if (editingUser) {
        await usersApi.updateUser(editingUser.id, submitData);
        showSuccess('User updated successfully');
      }
      
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Failed to save user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      showError(`Failed to update user: ${errorMessage}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPolicyCount = (userId) => {
    const policies = userPolicies[userId];
    return Array.isArray(policies) ? policies.length : 0;
  };

  const getTotalPremium = (userId) => {
    const policies = userPolicies[userId];
    if (!Array.isArray(policies)) return 0;
    
    return policies.reduce((total, userPolicy) => {
      return total + (userPolicy.policy?.premium || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600">View and manage user accounts and their policies</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search users by username, email, or role..."
          className="w-full"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No users found' : 'No users available'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Users will appear here when they purchase policies'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Policies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Premium
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.username?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.username || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{user.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getPolicyCount(user.id)} policies
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${getTotalPremium(user.id).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Username</h3>
                  <p className="text-sm text-gray-900">{selectedUser.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Role</h3>
                  <p className="text-sm text-gray-900">{selectedUser.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="text-sm text-gray-900">{selectedUser.status}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Policies</h3>
                {userPolicies[selectedUser.id] && userPolicies[selectedUser.id].length > 0 ? (
                  <div className="space-y-4">
                    {userPolicies[selectedUser.id].map((userPolicy, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {userPolicy.policy?.name || 'Unknown Policy'}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Policy Number: {userPolicy.policy?.number || 'N/A'}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            userPolicy.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {userPolicy.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {userPolicy.policy?.description || 'No description available'}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500">Premium:</span>
                            <p className="font-medium">${userPolicy.policy?.premium?.toLocaleString() || '0'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Purchase Date:</span>
                            <p className="font-medium">{formatDate(userPolicy.purchaseDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Expiry Date:</span>
                            <p className="font-medium">{formatDate(userPolicy.expiryDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Days Remaining:</span>
                            <p className="font-medium">
                              {userPolicy.expiryDate 
                                ? Math.max(0, Math.ceil((new Date(userPolicy.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)))
                                : 'N/A'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No policies purchased</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                Edit User
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave blank to keep current password"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="user">User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

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
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;