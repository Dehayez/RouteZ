import React, { useState } from 'react';

// Icons
import Check from '../../assets/icons/check-blue.svg';
import './Checkbox.scss';

const Checkbox = ({name, id, change}) => {
  const [ checked, setChecked ] = useState();

  const changeThis = (e) => {
    change(e.target.id, e.target.name);
    setChecked(e.target.checked);
  };


  return (
    <div className="checkbox">
		{
			checked && <img src={Check} alt="check" />
		}
        <input onChange={(e) => changeThis(e)} type="checkbox" name={name} id={id} />
    </div>
  )
};

export default Checkbox;
