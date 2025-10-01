// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { policiesApi } from '../api/policiesApi';
// import { usersApi } from '../api/usersApi';
// import { useNotifications } from '../hooks/useNotifications';
// import { userPoliciesApi } from '../api/userPoliciesApi';
// import { userClaimsApi } from '../api/userClaimApi';



// const AdminDashboard = () => {
//   const { showError } = useNotifications();
//   const [stats, setStats] = useState({
//     totalPolicies: 0,
//     totalUsers: 0,
//     activePurchases: 0,
//     totalRevenue: 0,
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Fetch policies data
//       const policies = await policiesApi.getAllPolicies();
//       const users = await usersApi.getAllUsers();
//       const purchases = await userPoliciesApi.getAllUserPolicies();
//       const claims= await userClaimsApi.getAllUserClaims();

      
//       setStats({
//         totalPolicies: policies.length,
//         totalUsers: users.length, // Mock data - would come from users endpoint
//         activePurchases: purchases.length, // Mock data - would come from user-policies endpoint
//         totalClaims: claims.length, // Mock data - calculated from purchases
//       });

//       // Mock recent activity data
//       setRecentActivity([
//         {
//           id: 1,
//           type: 'purchase',
//           message: 'New policy purchased: Auto Insurance Premium',
//           user: 'john.doe@email.com',
//           timestamp: '2024-01-15 14:30',
//         },
//         {
//           id: 2,
//           type: 'renewal',
//           message: 'Policy renewed: Home Insurance Standard',
//           user: 'jane.smith@email.com',
//           timestamp: '2024-01-15 13:45',
//         },
//         {
//           id: 3,
//           type: 'claim',
//           message: 'New claim filed: Health Insurance Plus',
//           user: 'mike.wilson@email.com',
//           timestamp: '2024-01-15 12:15',
//         },
//         {
//           id: 4,
//           type: 'registration',
//           message: 'New user registered',
//           user: 'sarah.johnson@email.com',
//           timestamp: '2024-01-15 11:20',
//         },
//       ]);

//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//       showError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'purchase':
//         return '🛒';
//       case 'renewal':
//         return '🔄';
//       case 'claim':
//         return '📋';
//       case 'registration':
//         return '👤';
//       default:
//         return '📊';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <div className="text-center">
//           <div className="spinner mb-4 mx-auto"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//         <p className="text-gray-600">Overview of your insurance platform</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex items-center">
//             <div className="bg-blue-500 text-white p-3 rounded-full">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Policies</p>
//               <p className="text-2xl font-semibold text-gray-900">{stats.totalPolicies}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex items-center">
//             <div className="bg-green-500 text-white p-3 rounded-full">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Users</p>
//               <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex items-center">
//             <div className="bg-yellow-500 text-white p-3 rounded-full">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Active Purchases</p>
//               <p className="text-2xl font-semibold text-gray-900">{stats.activePurchases}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex items-center">
//             <div className="bg-purple-500 text-white p-3 rounded-full">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-9 0V3h4v2m-2 4h.01M17 13l-3 3-1-1" />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Claims</p>
//               <p className="text-2xl font-semibold text-gray-900">{stats.totalClaims}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Link
//             to="/admin/policies"
//             className="flex items-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
//           >
//             <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <div>
//               <h3 className="font-semibold">Manage Policies</h3>
//               <p className="text-sm text-blue-600">Create, edit, and delete insurance policies</p>
//             </div>
//           </Link>

//           <Link
//             to="/admin/users"
//             className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
//           >
//             <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//             </svg>
//             <div>
//               <h3 className="font-semibold">Manage Users</h3>
//               <p className="text-sm text-green-600">View and manage user accounts</p>
//             </div>
//           </Link>

//           <Link
//             to="/admin/claims"
//             className="flex items-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
//           >
//             <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//             </svg>
//             <div>
//               <h3 className="font-semibold">Manage Claims</h3>
//               <p className="text-sm text-purple-600">Generate analytics and reports</p>
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
//         </div>
//         <div className="p-6">
//           {recentActivity.length === 0 ? (
//             <p className="text-gray-500 text-center py-4">No recent activity</p>
//           ) : (
//             <div className="space-y-4">
//               {recentActivity.map((activity) => (
//                 <div key={activity.id} className="flex items-start space-x-3">
//                   <div className="text-2xl">{getActivityIcon(activity.type)}</div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900">{activity.message}</p>
//                     <p className="text-sm text-gray-500">
//                       {activity.user} • {activity.timestamp}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* System Status */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//               <span className="text-sm font-medium text-gray-900">API Service</span>
//             </div>
//             <p className="text-xs text-gray-500">Operational</p>
//           </div>

//           <div className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//               <span className="text-sm font-medium text-gray-900">Database</span>
//             </div>
//             <p className="text-xs text-gray-500">Operational</p>
//           </div>

//           <div className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//               <span className="text-sm font-medium text-gray-900">Claims Processing</span>
//             </div>
//             <p className="text-xs text-gray-500">Operational</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { policiesApi } from '../api/policiesApi';
import { usersApi } from '../api/usersApi';
import { useNotifications } from '../hooks/useNotifications';
import { userPoliciesApi } from '../api/userPoliciesApi';
import { userClaimsApi } from '../api/userClaimApi';
import { analyticsApi } from '../api/analyticsApi';

const AdminDashboard = () => {
  const { showError } = useNotifications();
  const [stats, setStats] = useState({
    totalPolicies: 0,
    totalUsers: 0,
    activePurchases: 0,
    totalClaims: 0,
  });
  const [analytics, setAnalytics] = useState({
    newUsersLastWeek: 0,
    policiesPurchasedLastWeek: 0,
    claimsFiledLastWeek: 0,
    policiesByPurchaseCount: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      let policies = [];
      let users = [];
      let purchases = [];
      let claims = [];

      // Fetch policies with error handling
      try {
        policies = await policiesApi.getAllPolicies();
        console.log('Policies loaded:', policies);
      } catch (error) {
        console.error('Failed to fetch policies:', error.response || error);
      }

      // Fetch users with error handling
      try {
        users = await usersApi.getAllUsers();
        console.log('Users loaded:', users);
      } catch (error) {
        console.error('Failed to fetch users:', error.response || error);
      }

      // Fetch purchases with error handling
      try {
        purchases = await userPoliciesApi.getAllUserPolicies();
        console.log('Purchases loaded:', purchases);
      } catch (error) {
        console.error('Failed to fetch purchases:', error.response || error);
      }

      // Fetch claims with error handling
      try {
        claims = await userClaimsApi.getAllUserClaims();
        console.log('Claims loaded:', claims);
      } catch (error) {
        console.error('Failed to fetch claims:', error.response || error);
      }

      setStats({
        totalPolicies: policies.length || 0,
        totalUsers: users.length || 0,
        activePurchases: purchases.length || 0,
        totalClaims: claims.length || 0,
      });

      // Fetch analytics data from backend
      try {
        const analyticsData = await analyticsApi.getAnalyticsSummary();
        console.log('Analytics loaded:', analyticsData);
        console.log('New Users:', analyticsData.newUsersLastWeek);
        console.log('Policies Purchased:', analyticsData.policiesPurchasedLastWeek);
        console.log('Claims Filed:', analyticsData.claimsFiledLastWeek);
        console.log('Popular Policies:', analyticsData.policiesByPurchaseCount);
        
        setAnalytics({
          newUsersLastWeek: analyticsData.newUsersLastWeek || 0,
          policiesPurchasedLastWeek: analyticsData.policiesPurchasedLastWeek || 0,
          claimsFiledLastWeek: analyticsData.claimsFiledLastWeek || 0,
          policiesByPurchaseCount: analyticsData.policiesByPurchaseCount || [],
        });
      } catch (analyticsError) {
        console.error('Failed to fetch analytics:', analyticsError.response || analyticsError);
        // Don't show error for analytics, just use defaults
      }

    } catch (error) {
      console.error('Unexpected error in fetchDashboardData:', error);
      showError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

  // Prepare data for New Users chart (Bar Chart)
  const newUsersData = [
    { day: 'Last 7 Days', users: analytics.newUsersLastWeek }
  ];

  // Prepare data for Policies Purchased chart (Area Chart with trend)
  const policiesPurchasedData = [
    { period: 'Start', policies: 0 },
    { period: 'Last 7 Days', policies: analytics.policiesPurchasedLastWeek }
  ];

  // Prepare data for Claims Filed chart (Line Chart)
  const claimsData = [
    { period: 'Start', claims: 0 },
    { period: 'Last 7 Days', claims: analytics.claimsFiledLastWeek }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="spinner mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your insurance platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Policies</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalPolicies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-yellow-500 text-white p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Purchases</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activePurchases}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-purple-500 text-white p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-9 0V3h4v2m-2 4h.01M17 13l-3 3-1-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Claims</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalClaims}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/policies"
            className="flex items-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <h3 className="font-semibold">Manage Policies</h3>
              <p className="text-sm text-blue-600">Create, edit, and delete insurance policies</p>
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <div>
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-sm text-green-600">View and manage user accounts</p>
            </div>
          </Link>

          <Link
            to="/admin/claims"
            className="flex items-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-9 0V3h4v2m-2 4h.01M17 13l-3 3-1-1" />
            </svg>
            <div>
              <h3 className="font-semibold">Manage Claims</h3>
              <p className="text-sm text-purple-600">Review and process claims</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Report Analytics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: New Users in Last 7 Days - Bar Chart */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                New Users (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={newUsersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #3B82F6' }}
                    labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="users" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{analytics.newUsersLastWeek}</p>
                <p className="text-sm text-gray-600">New Registrations</p>
              </div>
            </div>

            {/* Chart 2: Policies Purchased (Last 7 Days) - Area Chart */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Policies Purchased (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={policiesPurchasedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="period" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #10B981' }}
                    labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="policies" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-3xl font-bold text-green-600">{analytics.policiesPurchasedLastWeek}</p>
                <p className="text-sm text-gray-600">Policies Purchased</p>
              </div>
            </div>

            {/* Chart 3: Popular Policies - Pie Chart */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Popular Policies
              </h3>
              {analytics.policiesByPurchaseCount.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={analytics.policiesByPurchaseCount}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analytics.policiesByPurchaseCount.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #F59E0B' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">No policy data available</p>
                </div>
              )}
            </div>

            {/* Chart 4: Claims Filed in Last 7 Days - Line Chart */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Claims Filed (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={claimsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="period" stroke="#374151" />
                  <YAxis stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #8B5CF6' }}
                    labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="claims" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-3xl font-bold text-purple-600">{analytics.claimsFiledLastWeek}</p>
                <p className="text-sm text-gray-600">New Claims</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-900">API Service</span>
            </div>
            <p className="text-xs text-gray-500">Operational</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-900">Database</span>
            </div>
            <p className="text-xs text-gray-500">Operational</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-900">Claims Processing</span>
            </div>
            <p className="text-xs text-gray-500">Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;