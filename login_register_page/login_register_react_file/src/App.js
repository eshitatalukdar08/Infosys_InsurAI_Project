import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import MessageBox from './components/MessageBox';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState('welcome');

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Incorrect username or password.');
      }

      const jwtToken = await response.text();
      setToken(jwtToken);
      setIsLoggedIn(true);
      localStorage.setItem('jwtToken', jwtToken);
      setCurrentPage('welcome');
      setMessage({ text: 'Login successful!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'User already exists. Please log in instead.');
      }

      const messageText = await response.text();
      setMessage({ text: messageText, type: 'success' });
      setCurrentPage('login');
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('jwtToken');
    setCurrentPage('welcome');
    setMessage(null);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <LoginForm onLogin={handleLogin} message={message} />;
      case 'register':
        return <RegisterForm onRegister={handleRegister} message={message} />;
      default:
        return <WelcomePage isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
      />
      <main className="main-content">
        {message && (
          <MessageBox
            message={message.text}
            type={message.type}
            onClose={() => setMessage(null)}
          />
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
