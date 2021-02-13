import React, { useState } from 'react';

const RadioSelect = ({ grouped, text, data, defaultSelected, setSelected }) => {
  // States
  const [ showFully, setShowFully ] = useState(false);

  return (
    <div>
      <div onClick={() => setShowFully(!showFully)}>{text}</div>
      {
        showFully && (
          <div>
            {
              grouped ? (
                data && data.map((signpost, index) => {
                  return <div key={index}>
                    <strong>{signpost.title}</strong>
                    {
                      signpost.modules.map((module, innerIndex) => {
                        return (
                          <div key={innerIndex}>
                            <label htmlFor={module.title}>
                              {module.title}
                            </label>
                            <input onChange={() => setSelected(module._id)} defaultChecked={defaultSelected === module._id ? true : false} type="radio" value={module._id} name="selectOne"/>
                          </div>
                        )
                      })
                    }
                  </div>
                })
              ) : (
                data && data.map((element, index) => {
                  return <div key={index}>
                  <label htmlFor={element.title}>
                    {element.title}
                  </label>
                  <input onChange={() => setSelected(element._id)} defaultChecked={defaultSelected === element._id ? true : false} type="radio" value={element._id} name="selectTwo"/>
                  </div>
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
