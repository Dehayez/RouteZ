import React from 'react';

// CSS
import './_Checkbox.scss';

const Checkbox = ({ checked, setChecked, id, label }) => {
  return (
    <div className="checkbox d-flex align-items-center">
      <div className="checkbox__button" onClick={() => setChecked(id)}>
        {
          checked && <div className="checkbox__button--inner"></div>
        }
      </div>
      <span>{label}</span>
    </div>
  )
};

export default Checkbox;
