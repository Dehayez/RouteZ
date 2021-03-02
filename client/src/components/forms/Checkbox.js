import React, { useState } from 'react';

// Icons
import Check from '../../assets/icons/check-blue.svg';
import './Checkbox.scss';

const Checkbox = ({name, id, change, action}) => {
  const [ checked, setChecked ] = useState();

  const changeThis = (e) => {
    change(e.target.id, e.target.name);
    setChecked(e.target.checked);
  };

  const changeNext = (id, name) => {
    change(id, name);
    setChecked(!checked);
  };

  return !action ? (
    <div className="checkbox">
		{
			checked && <img src={Check} alt="check" />
		}
        <input onChange={(e) => changeThis(e)} type="checkbox" name={name} id={id} />
    </div>
  ) : (
    <div className="checkbox" onClick={() => changeNext(id, name)}>
		{
			checked && <img src={Check} alt="check" />
		}
        <input type="checkbox" name={name} id={id} />
    </div>
  )
};

export default Checkbox;
