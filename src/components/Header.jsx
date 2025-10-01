// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const Header = () => {
//   const { user, logout, isAdmin } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header className="bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
//               AI
//             </div>
//             <span className="text-xl font-bold">InsurAI</span>
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link to="/" className="hover:text-blue-200 transition-colors">
//               Home
//             </Link>
//             {user && (
//               <>
//                 <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
//                   Dashboard
//                 </Link>
//                 <Link to="/claims" className="hover:text-blue-200 transition-colors">
//                   Claims
//                 </Link>
//                 {isAdmin() && (
//                   <Link to="/admin" className="hover:text-blue-200 transition-colors">
//                     Admin
//                   </Link>
//                 )}
//               </>
//             )}
//           </nav>

//           {/* User Menu */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm">
//                   Welcome, {user.username}
//                   {isAdmin() && (
//                     <span className="ml-1 px-2 py-1 bg-yellow-500 text-yellow-900 text-xs rounded-full">
//                       Admin
//                     </span>
//                   )}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="space-x-2">
//                 <Link
//                   to="/login"
//                   className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded text-sm transition-colors"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {user && (
//           <nav className="md:hidden pb-4">
//             <div className="flex flex-wrap gap-4 text-sm">
//               <Link to="/" className="hover:text-blue-200 transition-colors">
//                 Home
//               </Link>
//               <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
//                 Dashboard
//               </Link>
//               <Link to="/claims" className="hover:text-blue-200 transition-colors">
//                 Claims
//               </Link>
//               {isAdmin() && (
//                 <Link to="/admin" className="hover:text-blue-200 transition-colors">
//                   Admin
//                 </Link>
//               )}
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
              AI
            </div>
            <span className="text-xl font-bold">InsurAI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link to="/" className="hover:text-blue-200 transition-colors">
                  Home
                </Link>
                {/* Show Dashboard and Claims only for regular users (not admins) */}
                {!isAdmin() && (
                  <>
                    <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/claims" className="hover:text-blue-200 transition-colors">
                      Claims
                    </Link>
                  </>
                )}
                {/* Show Admin link only for admins */}
                {isAdmin() && (
                  <Link to="/admin" className="hover:text-blue-200 transition-colors">
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Welcome, {user.username}
                  {isAdmin() && (
                    <span className="ml-1 px-2 py-1 bg-yellow-500 text-yellow-900 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded text-sm transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
              {/* Show Dashboard and Claims only for regular users (not admins) */}
              {!isAdmin() && (
                <>
                  <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/claims" className="hover:text-blue-200 transition-colors">
                    Claims
                  </Link>
                </>
              )}
              {/* Show Admin link only for admins */}
              {isAdmin() && (
                <Link to="/admin" className="hover:text-blue-200 transition-colors">
                  Admin
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;