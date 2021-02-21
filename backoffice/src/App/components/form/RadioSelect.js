import React, { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

// CSS
import './_RadioSelect.scss';

const RadioSelect = ({ grouped, text, data, defaultSelected, setSelected }) => {
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
              grouped ? (
                data && data.map((signpost, index) => {
                  return <div key={index}>
                    <strong>{signpost.title}</strong>
                    {
                      signpost.modules.map((module, innerIndex) => {
                        return (
                        <label className="radio" key={innerIndex}>
                          <span className="radio__input" htmlFor={module.title}> 
                            <input onChange={() => setSelected(module._id)} defaultChecked={defaultSelected === module._id ? true : false} type="radio" value={module._id} name="selectOne"/>
                            <span className="radio__control"></span>
                          </span>
                          <span className="radio__label">{module.title}</span>
                        </label>
                        )
                      })
                    }
                  </div>
                })
              ) : (
                data && data.map((element, index) => {
                  return <label className="radio" key={index}>
                    <span className="radio__input" htmlFor={element.title}> 
                      <input onChange={() => setSelected(element._id)} defaultChecked={defaultSelected === element._id ? true : false} type="radio" value={element._id} name="selectTwo"/>
                      <span className="radio__control"></span>
                    </span>
                    <span className="radio__label">{ element.title }</span>
						      </label>
                })
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default RadioSelect;
