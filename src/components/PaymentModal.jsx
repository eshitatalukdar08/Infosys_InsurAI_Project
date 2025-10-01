// import React, { useState } from 'react';
// import { userPoliciesApi } from '../api/userPoliciesApi';
// import { useAuth } from '../hooks/useAuth';

// const PaymentModal = ({ isOpen, onClose, policy, onPurchaseSuccess }) => {
//     const { user } = useAuth();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         cardNumber: '',
//         expiryDate: '',
//         cvv: '',
//         cardholderName: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // This is a demo payment, so we just check for basic form validity
//         if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
//             alert('Please fill in all card details.');
//             return;
//         }

//         setLoading(true);

//         // Simulate a successful payment API call with a short delay
//         try {
//             await new Promise(resolve => setTimeout(resolve, 1000)); // Simulates network latency
            
//             // On successful simulated payment, call the prop function to post to our backend
//             onPurchaseSuccess({
//                 userId: user.id,
//                 policyId: policy.id,
//             });
            
//             onClose(); // Close the modal
//         } catch (error) {
//             // This block would handle payment gateway errors in a real app
//             console.error('Simulated payment failed:', error);
//             alert('Simulated payment failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//         }).format(amount);
//     };

//     if (!isOpen || !policy) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-6 border-b">
//                     <h2 className="text-xl font-semibold">Purchase Policy</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-600"
//                         disabled={loading}
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M6 18L18 6M6 6l12 12"
//                             />
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Policy Summary */}
//                 <div className="p-6 border-b bg-gray-50">
//                     <h3 className="font-semibold text-lg mb-2">{policy.name}</h3>
//                     <div className="space-y-1 text-sm">
//                         <div className="flex justify-between">
//                             <span>Premium:</span>
//                             <span className="font-medium">{formatCurrency(policy.premium)}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Coverage:</span>
//                             <span className="font-medium">{formatCurrency(policy.coverage)}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Deductible:</span>
//                             <span className="font-medium">{formatCurrency(policy.deductible)}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Payment Form */}
//                 <form onSubmit={handleSubmit} className="p-6">
//                     <div className="space-y-4">
//                         <div>
//                             <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Cardholder Name
//                             </label>
//                             <input
//                                 type="text"
//                                 id="cardholderName"
//                                 name="cardholderName"
//                                 value={formData.cardholderName}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="John Doe"
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Card Number
//                             </label>
//                             <input
//                                 type="text"
//                                 id="cardNumber"
//                                 name="cardNumber"
//                                 value={formData.cardNumber}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="1234 5678 9012 3456"
//                                 maxLength={19}
//                             />
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Expiry Date
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="expiryDate"
//                                     name="expiryDate"
//                                     value={formData.expiryDate}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="MM/YY"
//                                     maxLength={5}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
//                                     CVV
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="cvv"
//                                     name="cvv"
//                                     value={formData.cvv}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="123"
//                                     maxLength={4}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             disabled={loading}
//                             className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
//                         >
//                             {loading ? (
//                                 <>
//                                     <div className="spinner mr-2"></div>
//                                     Processing...
//                                 </>
//                             ) : (
//                                 `Pay ${formatCurrency(policy.premium)}`
//                             )}
//                         </button>
//                     </div>
//                 </form>

//                 {/* Disclaimer */}
//                 <div className="px-6 pb-6 text-xs text-gray-500">
//                     <p className="mb-2">🔒 This is a demo payment form. No actual charges will be made.</p>
//                     <p>By proceeding, you agree to the terms and conditions of this insurance policy.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentModal;

import React, { useState } from 'react';
import { userPoliciesApi } from '../api/userPoliciesApi';
import { useAuth } from '../hooks/useAuth';

const PaymentModal = ({ isOpen, onClose, policy, onPurchaseSuccess }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
            alert('Please fill in all card details.');
            return;
        }

        if (!user || !user.id || !policy || !policy.id) {
            alert('User or policy information is missing.');
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const userPolicyData = {
                user: {
                    id: user.id
                },
                policy: {
                    id: policy.id
                }
            };

            await userPoliciesApi.purchasePolicy(userPolicyData);
            
            // This is the correct way to handle the prop function
            if (onPurchaseSuccess && typeof onPurchaseSuccess === 'function') {
                onPurchaseSuccess();
            }

            onClose(); 
        } catch (error) {
            console.error('Simulated payment or policy purchase failed:', error);
            alert('Simulated payment or policy purchase failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (!isOpen || !policy) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Purchase Policy</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                        disabled={loading}
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

                {/* Policy Summary */}
                <div className="p-6 border-b bg-gray-50">
                    <h3 className="font-semibold text-lg mb-2">{policy.name}</h3>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Premium:</span>
                            <span className="font-medium">{formatCurrency(policy.premium)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Coverage:</span>
                            <span className="font-medium">{formatCurrency(policy.coverageAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Deductible:</span>
                            <span className="font-medium">{formatCurrency(policy.deductible)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                                Cardholder Name
                            </label>
                            <input
                                type="text"
                                id="cardholderName"
                                name="cardholderName"
                                value={formData.cardholderName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Card Number
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="123"
                                    maxLength={4}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                        >
                            {loading ? (
                                <>
                                    <div className="spinner mr-2"></div>
                                    Processing...
                                </>
                            ) : (
                                `Pay ${formatCurrency(policy.premium)}`
                            )}
                        </button>
                    </div>
                </form>

                {/* Disclaimer */}
                <div className="px-6 pb-6 text-xs text-gray-500">
                    <p className="mb-2">🔒 This is a demo payment form. No actual charges will be made.</p>
                    <p>By proceeding, you agree to the terms and conditions of this insurance policy.</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;