import React from 'react';
import MessageBox from '../components/MessageBox';

const RegisterForm = ({ onRegister, message }) => (
  <div className="form-container">
    <div className="form-card">
      <h2>Register</h2>
    {/*  {message && message.type === 'error' && <MessageBox message={message.text} type="error" onClose={() => { }} />} */}
      <form onSubmit={onRegister}>
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
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            className="form-input"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button
          type="submit"
          className="form-submit-btn btn-register"
        >
          Register
        </button>
      </form>
    </div>
  </div>
);

export default RegisterForm;
