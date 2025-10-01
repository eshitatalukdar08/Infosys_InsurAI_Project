// PolicyCard.jsx
import React, { useState } from 'react'; // 👈 Import useState
import { Link } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal'; // 👈 Import PaymentModal
import { useAuth } from '../hooks/useAuth'; // 👈 Import useAuth

const PolicyCard = ({ policy, showActions = true, onEdit, onDelete }) => {
    const { user } = useAuth(); // 👈 Get the user from the auth context
    const [isModalOpen, setIsModalOpen] = useState(false); // 👈 New state for modal

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const handlePurchaseSuccess = () => {
        console.log('Purchase successful!');
        // You can add logic here to refresh the user's policies list
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{policy.policyName}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {policy.type || 'Insurance'}
                </span>
            </div>
           
            
            <p className="text-gray-600 mb-4 line-clamp-3">{policy.description}</p>
            
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-500">Premium:</span>
                    <span className="font-medium">{formatCurrency(policy.premium)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Coverage:</span>
                    <span className="font-medium">{formatCurrency(policy.coverageAmount)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Deductible:</span>
                    <span className="font-medium">{formatCurrency(policy.deductible)}</span>
                </div>
            </div>
            
            {showActions && (
                <div className="flex justify-between items-center pt-4 border-t">
                    <Link
                        to={`/policy/${policy.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View Details
                    </Link>
                    
                    {/* Admin actions (Edit/Delete) */}
                    {onEdit && onDelete && (
                        <div className="space-x-2">
                            <button onClick={() => onEdit(policy)} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors text-sm">
                                Edit
                            </button>
                            <button onClick={() => onDelete(policy.id)} className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm">
                                Delete
                            </button>
                        </div>
                    )}
                    
                    {/* The "Buy Now" button for authenticated users */}
                    {user && (
                        <button
                            onClick={() => setIsModalOpen(true)} // 👈 Open the modal on click
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Buy Now
                        </button>
                    )}
                </div>
            )}
            
            {/* The PaymentModal component */}
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                policy={policy}
                onSuccess={handlePurchaseSuccess}
            />
        </div>
    );
};

export default PolicyCard;