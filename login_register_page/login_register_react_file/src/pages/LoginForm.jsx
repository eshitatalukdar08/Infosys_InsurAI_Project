import React from 'react';
import MessageBox from '../components/MessageBox';

const LoginForm = ({ onLogin, message }) => (
  <div className="form-container">
    <div className="form-card">
      <h2>Login</h2>
     {/*  {message && message.type === 'error' && <MessageBox message={message.text} type="error" onClose={() => { }} />} */} 
      <form onSubmit={onLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            className="form-input"
          />
        </div>
        <button
          type="submit"
          className="form-submit-btn btn-login"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);

export default LoginForm;
