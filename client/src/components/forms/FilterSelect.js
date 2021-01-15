import React, { useState } from 'react';

// Icons
import Arrow from '../../assets/icons/arrow-blue.svg';

// Components
import { Checkbox } from '../forms';

const FilterSelect = ({text, options, sections, setQuery, query, type}) => {
  // States
  const [ selected, setSelected ] = useState([]);
  const [ showSelect, setShowSelect ] = useState(false);
  const [ selectedString, setSelectedString ] = useState();

  // Selection a group of options
  const selectSection = (index) => {
    const grouped =  document.getElementsByClassName('filter-select__select--section__options')[index].children;

    for (let i = 0; i < grouped.length; i++) {
      grouped[i].children[1].children[0].children[0].checked = true;

      if (!selected.filter(e => e.id === grouped[i].children[1].children[0].children[0].id).length > 0) {
        let array = selected;
        array.push({id: grouped[i].children[1].children[0].children[0].id, name: grouped[i].children[1].children[0].children[0].name});

        let queryArray = query[type];
        queryArray.push(grouped[i].children[1].children[0].children[0].id);
        
        setSelected(array);
        createPlaceholder(array);
        setQuery({
          ...query,
          [type]: queryArray,
        });
      };
    };
  };

  // Change an item to checked or not
  const editSelected = (id, name) => {
    let array = selected;
    let queryArray = query[type];

    if (!queryArray.includes(id)) {
      queryArray.push(id);
    } else {
      const queryIndex = queryArray.indexOf(id);
      queryArray.splice(queryIndex, 1);
    };

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
    setQuery({
      ...query,
      [type]: queryArray,
    });
  };

  // Create the string of checked items
  const createPlaceholder = (array) => {
    let string = '';

    for (let i = 0; i < array.length; i++) {
      string = string + array[i].name + ', ';
    };

    string = string.substring(0, 20).toLowerCase();
    setSelectedString(string);
  };

  return (
    <div className="filter-select">
      <div className="filter-select__field" onClick={() => setShowSelect(!showSelect)}>
        { 
          selectedString ? `${selectedString}...` : text 
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
                    <Checkbox change={editSelected} name={option.title} id={option.id} />
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
                            <Checkbox change={editSelected} name={innerOption.title} id={innerOption.id} />
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
