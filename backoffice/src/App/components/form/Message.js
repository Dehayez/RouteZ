import React from 'react';

// CSS
import './_Message.scss';

const Message = ({ text }) => {
  return (
    <div className="message">
      <span>{text}</span>
    </div>
  );
};

export default Message;
