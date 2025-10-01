// import React, { useState } from 'react';

// const SearchBar = ({ onSearch, placeholder = "Search policies...", className = "" }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   const handleClear = () => {
//     setSearchTerm('');
//     onSearch('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className={`relative ${className}`}>
//       <div className="relative">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder={placeholder}
//           className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
        
//         {/* Search Icon */}
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <svg
//             className="h-5 w-5 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
        
//         {/* Clear Button */}
//         {searchTerm && (
//           <button
//             type="button"
//             onClick={handleClear}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//           >
//             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         )}
//       </div>
      
//       {/* Search Button (hidden but functional for form submission) */}
//       <button type="submit" className="sr-only">
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchBar;

// SearchBar.jsx

import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search policies...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    // REMOVE THE <form> ELEMENT HERE
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
    // REMOVE THE </form> ELEMENT HERE
  );
};

export default SearchBar;