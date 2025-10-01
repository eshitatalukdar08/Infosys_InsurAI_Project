import React from 'react';

const WelcomePage = ({ isLoggedIn }) => {
  return (
    <div className="welcome-page">
      <h1>
        Welcome to InsurAI
      </h1>
      <p>
        {isLoggedIn
          ? "You are now securely connected. Explore our features and manage your policies."
          : "Your trusted partner for corporate policy automation and intelligence. Please log in or register to get started."}
      </p>
    </div>
  );
};

export default WelcomePage;
