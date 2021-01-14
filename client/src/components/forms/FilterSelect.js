import React, { useState } from 'react';

// Icons
import Arrow from '../../assets/icons/arrow-blue.svg';

// Components
import { Checkbox } from '../forms';

const FilterSelect = ({options, sections}) => {
  const [ selected, setSelected ] = useState([]);
  const [ showSelect, setShowSelect ] = useState(false);
  const [ selectedString, setSelectedString ] = useState();

  const selectSection = (index) => {
    const grouped =  document.getElementsByClassName('filter-select__select--section__options')[index].children;

    for (let i = 0; i < grouped.length; i++) {
      grouped[i].children[1].checked = true;

      if (!selected.filter(e => e.id === grouped[i].children[1].id).length > 0) {
        let array = selected;
        array.push({id: grouped[i].children[1].id, name: grouped[i].children[1].name});
        setSelected(array);
        createPlaceholder(array);
      };
    };
  };

  const editSelected = (id, name) => {
    let array = selected;

    if (!selected.filter(e => e.id === id).length > 0) {
      array.push({id: id, name: name});
    } else {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          array.splice(i, 1);
        };
      };
    };

    setSelected(array);
    createPlaceholder(array);
  };

  const createPlaceholder = (array) => {
    let string = '';

    for (let i = 0; i < array.length; i++) {
      string = string + array[i].name + ', ';
    };

    string = string.substring(0, 20);
    setSelectedString(string);
  };

  return (
    <div className="filter-select">
      <div className="filter-select__field" onClick={() => setShowSelect(!showSelect)}>
        { 
          selectedString ? `${selectedString}...` : 'Specifiek zoeken naar een type bestand' 
        } 
        <img src={Arrow} alt="arrow" className={showSelect ? 'arrow-up' : 'arrow-down'} />
      </div>
      {
        showSelect && (
          <div className="filter-select__select">
            {
              !sections ? options.map((option, index) => {
                return (
                  <div key={index} className="filter-select__select--section__options--option">
                    <label htmlFor={option.id}>{option.title}</label>
                    <input onChange={(e) => editSelected(e.target.id, e.target.name)} type="checkbox" id={option.id} name={option.title} />
                  </div>
                )
              }) : options.map((option, index) => {
                return (
                  <div key={index} className="filter-select__select--section">
                    <span onClick={() => selectSection(index)}>{option.title}</span>
                    <div className="filter-select__select--section__options">
                      {
                        option.modules.map((innerOption, innerIndex) => {
                          return <div key={innerIndex} className="filter-select__select--section__options--option">
                            <label htmlFor={innerOption.id}>{innerOption.title}</label>
                            <input onChange={(e) => editSelected(e.target.id, e.target.name)} type="checkbox" id={innerOption.id} name={innerOption.title} />
                          </div>
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  );
};

export default FilterSelect;
