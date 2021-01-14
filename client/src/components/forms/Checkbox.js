import React, { useState } from 'react';

// Icons
import Check from '../../assets/icons/check-blue.svg';

const Checkbox = ({name, id, change}) => {
  const [ checked, setChecked ] = useState();

  const changeThis = (e) => {
    change(e.target.id, e.target.name);
    setChecked(e.target.checked);
  };

  return (
    <div className="checkbox">
      <span>
        {
          checked && <img src={Check} alt="check" />
        }
        <input onChange={(e) => changeThis(e)} type="checkbox" name={name} id={id} />
      </span>
    </div>
  )
};

export default Checkbox;
