// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { policiesApi } from '../api/policiesApi';
// import PolicyCard from '../components/PolicyCard';
// import SearchBar from '../components/SearchBar';
// import { useAuth } from '../hooks/useAuth';

// const Home = () => {
//   const { user } = useAuth();
//   const [policies, setPolicies] = useState([]);
//   const [filteredPolicies, setFilteredPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredPolicies(policies);
//     } else {
//       const filtered = policies.filter(policy =>
//         policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         policy.description.toLowerCase().includes(searchTerm.toLowerCase())
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
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               AI-Powered Insurance
//               <span className="block text-blue-200">Made Simple</span>
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               Discover, compare, and purchase insurance policies with the power of artificial intelligence
//             </p>
//             {!user && (
//               <div className="space-x-4">
//                 <Link
//                   to="/register"
//                   className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//                 >
//                   Get Started
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
//                 >
//                   Sign In
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Why Choose InsurAI?
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Our AI-powered platform makes insurance simple, transparent, and accessible for everyone
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center p-6">
//               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl">🤖</span>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
//               <p className="text-gray-600">
//                 Get personalized policy recommendations based on your unique needs and circumstances
//               </p>
//             </div>

//             <div className="text-center p-6">
//               <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl">⚡</span>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Instant Processing</h3>
//               <p className="text-gray-600">
//                 Purchase policies and file claims instantly with our automated processing system
//               </p>
//             </div>

//             <div className="text-center p-6">
//               <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl">🔒</span>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
//               <p className="text-gray-600">
//                 Your data is protected with enterprise-grade security and encryption
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Policies Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Policies</h2>
//               <p className="text-gray-600">Find the perfect insurance coverage for your needs</p>
//             </div>
//             <div className="mt-4 md:mt-0 w-full md:w-96">
//               <SearchBar onSearch={handleSearch} />
//             </div>
//           </div>

//           {loading ? (
//             <div className="text-center py-12">
//               <div className="spinner mb-4 mx-auto"></div>
//               <p className="text-gray-600">Loading policies...</p>
//             </div>
//           ) : filteredPolicies.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-6xl mb-4">📋</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {searchTerm ? 'No policies found' : 'No policies available'}
//               </h3>
//               <p className="text-gray-600">
//                 {searchTerm 
//                   ? 'Try adjusting your search terms' 
//                   : 'Check back later for new policies'}
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredPolicies.map((policy) => (
//                 <PolicyCard
//                   key={policy.id}
//                   policy={policy}
//                   showActions={true}
//                 />
//               ))}
//             </div>
//           )}

//           {!user && (
//             <div className="text-center mt-12">
//               <div className="bg-blue-50 rounded-lg p-8">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Ready to Get Started?
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Create an account to purchase policies and manage your insurance
//                 </p>
//                 <Link
//                   to="/register"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Sign Up Now
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { policiesApi } from '../api/policiesApi';
import PolicyCard from '../components/PolicyCard';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../hooks/useAuth';
import PaymentModal from '../components/PaymentModal';
import { userPoliciesApi } from '../api/userPoliciesApi'; // 👈 Import userPoliciesApi

const Home = () => {
    const { user } = useAuth();
    const [policies, setPolicies] = useState([]);
    const [filteredPolicies, setFilteredPolicies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    useEffect(() => {
        if (user) {
            fetchPolicies();
        }
    }, [user]);

    useEffect(() => {
        if (policies && policies.length > 0) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = policies.filter(policy => {
                const name = policy?.name?.toLowerCase() || '';
                const description = policy?.description?.toLowerCase() || '';
                
                if (lowerCaseSearchTerm === '' || lowerCaseSearchTerm === 'all') {
                    return true;
                }
                
                return name.includes(lowerCaseSearchTerm) || description.includes(lowerCaseSearchTerm);
            });
            setFilteredPolicies(filtered);
        } else {
            setFilteredPolicies([]);
        }
    }, [policies, searchTerm]);

    const fetchPolicies = async () => {
        setLoading(true);
        setFetchError(null);
        try {
            const data = await policiesApi.getAllPolicies();
            setPolicies(data);
        } catch (error) {
            setFetchError('Failed to fetch policies. Please try logging in.');
            console.error('Failed to fetch policies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSearchClick = () => {
        if (user) {
            setSearchTerm(searchTerm);
        } else {
            setFetchError("Please log in to search for policies.");
        }
    };

    const handlePurchaseClick = (policy) => {
      setSelectedPolicy(policy);
      setIsModalOpen(true);
    };

    // 👈 NEW: This function handles the successful payment from the modal
    const handlePurchaseSuccess = async (purchaseData) => {
        const { userId, policyId } = purchaseData;
        
        // Prepare the data to send to the backend
        const userPolicyData = {
            userId: userId,
            policyId: policyId,
            purchaseDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            status: 'active',
        };

        try {
            // Post the user policy to your backend
            await userPoliciesApi.purchasePolicy(userPolicyData);
            alert("Your policy has been successfully purchased and recorded!");
        } catch (error) {
            console.error("Failed to post user policy:", error);
            alert("Failed to record policy. Please contact support.");
        }
    };

    return (
        <div className="min-h-screen">
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            AI-Powered Insurance
                            <span className="block text-blue-200">Made Simple</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Discover, compare, and purchase insurance policies with the power of artificial intelligence
                        </p>
                        {!user && (
                            <div className="space-x-4">
                                <Link
                                    to="/register"
                                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="/login"
                                    className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose InsurAI?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our AI-powered platform makes insurance simple, transparent, and accessible for everyone
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
                            <p className="text-gray-600">
                                Get personalized policy recommendations based on your unique needs and circumstances
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Instant Processing</h3>
                            <p className="text-gray-600">
                                Purchase policies and file claims instantly with our automated processing system
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
                            <p className="text-gray-600">
                                Your data is protected with enterprise-grade security and encryption
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Policies Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Policies</h2>
                            <p className="text-gray-600">Find the perfect insurance coverage for your needs</p>
                        </div>
                        <div className="mt-4 md:mt-0 w-full md:w-96">
                            <form onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}>
                                <div className="flex items-center space-x-2">
                                    <SearchBar onSearch={handleSearch} />
                                    <button type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        disabled={loading}>
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="spinner mb-4 mx-auto"></div>
                            <p className="text-gray-600">Loading policies...</p>
                        </div>
                    ) : fetchError ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">⚠️</div>
                            <p className="text-red-600 font-semibold mb-2">{fetchError}</p>
                            <p className="text-gray-600">You must be logged in to view policies.</p>
                        </div>
                    ) : filteredPolicies.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No policies found
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your search terms or search for "all".
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPolicies.map((policy) => (
                                <PolicyCard
                                    key={policy.id}
                                    policy={policy}
                                    showActions={true}
                                    onPurchase={handlePurchaseClick}
                                />
                            ))}
                        </div>
                    )}

                    {!user && (
                        <div className="text-center mt-12">
                            <div className="bg-blue-50 rounded-lg p-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Ready to Get Started?
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Create an account to purchase policies and manage your insurance
                                </p>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Sign Up Now
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 👈 RENDER THE MODAL AT THE BOTTOM OF THE COMPONENT */}
            <PaymentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                policy={selectedPolicy}
                onPurchaseSuccess={handlePurchaseSuccess}
            />
        </div>
    );
};

export default Home;