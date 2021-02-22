import React, { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

// CSS
import './_RadioSelect.scss';

const MultipleRadioSelect = ({ text, data, defaultSelected, setSelected }) => {
  // States
  const [ showFully, setShowFully ] = useState(false);

  return (
    <div className="radio-select" className={showFully ? 'radio-select radio-select--active' : 'radio-select' }>
      <div className="radio-select__field" onClick={() => setShowFully(!showFully)}>
		  {text} 
        <IoIosArrowUp className={showFully ? 'arrow-down' : 'arrow-up' }/>
      </div>
      {
        showFully && (
          <div className="radio-select__select">
            {
              data && data.map((element, index) => {
                return <label className="radio" key={index}>
                  <span className="radio__input" htmlFor={element.title}> 
                    <input onClick={() => setSelected(element._id)} checked={defaultSelected.includes(element._id) ? true : false} type="radio" value={element._id} name={`select-${element._id}`}/>
                    <span className="radio__control"></span>
                  </span>
                  <span className="radio__label">{ element.title }</span>
                </label>
              })
            }
          </div>
        )
      }
    </div>
  );
};

export default MultipleRadioSelect;
