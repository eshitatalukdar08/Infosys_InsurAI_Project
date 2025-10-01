import React from 'react';

const MessageBox = ({ message, onClose, type }) => {
  let bgColor = "message-box-error";
  if (type === "success") {
    bgColor = "message-box-success";
  }

  return (
    <div className={`message-box ${bgColor}`}>
      <div className="message-box-content">
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="message-box-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
