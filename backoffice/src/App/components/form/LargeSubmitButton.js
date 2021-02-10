import React from 'react';

// CSS
import './_LargeSubmitButton.scss';

const LargeSubmitButton = ({ text }) => {
  return (
    <button type="submit" className="large-submit-button">
      {text}
    </button>
  );
};

export default LargeSubmitButton;
