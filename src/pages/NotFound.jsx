import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          {/* 404 Illustration */}
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-6">
              <svg
                className="w-16 h-16 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6 5H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Go to Homepage
              </Link>
              <button
                onClick={handleGoBack}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Go Back
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <Link
                  to="/dashboard"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Dashboard
                </Link>
                <span className="hidden sm:inline text-gray-300">•</span>
                <Link
                  to="/claims"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Claims
                </Link>
                <span className="hidden sm:inline text-gray-300">•</span>
                <a
                  href="mailto:support@insurai.com"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Need Help?</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check the URL for any typos</li>
            <li>• Use the navigation menu to find what you're looking for</li>
            <li>• Contact our support team if you continue having issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;