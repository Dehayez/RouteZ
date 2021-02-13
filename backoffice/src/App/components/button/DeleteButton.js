import React from 'react';

// CSS
import './_DeleteButton.scss';

const DeleteButton = ({ text, action }) => {
  return (
    <span className="delete-button" onClick={action}>
      {text}
    </span>
  );
};

export default DeleteButton;
