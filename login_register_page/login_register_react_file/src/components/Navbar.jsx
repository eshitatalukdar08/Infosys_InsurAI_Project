import React from 'react';
import { icons } from '../assets/icons';

const Navbar = ({ isLoggedIn, onLogout, onNavigate }) => {
  const { LogOut, User, Key, Search, Home, Info, Award } = icons;
  return (
    <header className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('welcome')} style={{ cursor: 'pointer' }}>
        <span className="hidden-sm">InsurAI</span>
        <span className="visible-sm"></span>
      </div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => onNavigate('welcome')}
              className="nav-link"
            >
              <Home size={18} />
              <span className="hidden-sm">Home</span>
            </button>
            <button
              onClick={() => alert('About page content here.')}
              className="nav-link"
            >
              <Info size={18} />
              <span className="hidden-sm">About</span>
            </button>
            <button
              onClick={() => alert('Features page content here.')}
              className="nav-link"
            >
              <Award size={18} />
              <span className="hidden-sm">Features</span>
            </button>
            <button
              onClick={() => alert('Search bar content here.')}
              className="nav-link"
            >
              <Search size={18} />
              <span className="hidden-sm">Search</span>
            </button>
            <button
              onClick={onLogout}
              className="btn btn-logout"
            >
              <LogOut size={18} />
              <span className="hidden-sm">Logout</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('login')}
              className="btn btn-login"
            >
              <User size={18} />
              <span>Login</span>
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="btn btn-register"
            >
              <Key size={18} />
              <span>Register</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
