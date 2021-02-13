import React from 'react';

// CSS
import './_UsualButton.scss';

const UsualButton = ({text, action}) => {
  return (
    <span className="usual-button" onClick={action}>
      {text}
    </span>
  );
};

export default UsualButton;
