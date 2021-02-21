import React, { useCallback, useEffect, useState } from 'react';
import { IoRemoveCircle } from 'react-icons/io5';

// Services
import { useApi } from '../../services';

// CSS
import './_Tags.scss';

// Small function to force a re-render
const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

const Tags = ({ defaultTags, setForm }) => {
  const forceUpdate = useForceUpdate();

  // Services
  const { getTags } = useApi();

  // States
  const [ tags, setTags ] = useState();
  const [ selectedTags, setSelectedTags ] = useState([]);
  const [ typedTag, setTypedTag ] = useState({
    'text': '',
    'list': false,
  });

  // Fetch all tags
  const fetchTags = useCallback(async () => {
    const data = await getTags();
    setTags(data);

    if (defaultTags) setSelectedTags(defaultTags);
  }, [getTags, defaultTags]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const checkTag = (e) => {
    if (e.target.value.length === 0) {
      setTypedTag({
        text: e.target.value,
        list: false,
      });
    } else {
      setTypedTag({
        text: e.target.value,
        list: true,
      });
    };
  };

  const removeTag = (id) => {
    let array = selectedTags;

    for (let i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i]._id === id) {
        array.splice(i, 1);
      };
    };

    setSelectedTags(array);
    setForm(array);
    forceUpdate();
  };

  const addTag = (e, tag) => {
    e.preventDefault();
    let array = selectedTags;
    array.push(tag);
    setSelectedTags(array);
    setForm(array);
    forceUpdate();
  };

  return (
      <div className="tag">
          <label className="tag__label">Tags</label>
      <div className="tag-selected">
      {
        selectedTags && selectedTags.map((tag, index) => {
          return (
            <div className="tag-selected-item" onClick={() => removeTag(tag._id)} key={index}>
              <IoRemoveCircle className="tag-selected-item__icon"/>
              {tag.name}
            </div>
          )
        })
      }
      </div>
          <input className="tag__input" onChange={(e) => checkTag(e)} placeholder="Zoek" type="text" name="tag" id="tag" />
          <div className="tag-found">
        <label className="tag-found__label">Selecteer tags</label>
        {
        typedTag.list && (
          <div className="tag-found-container ">
            {tags && tags.map((tag, index) => {
            return tag.name.includes(typedTag.text.toLowerCase()) && <div className="tag-found-item" key={index} onClick={(e) => addTag(e, tag)}>{tag.name}</div>
            })}
          </div>
        )
        }
      </div>
    </div>
  )
};

export default Tags;
