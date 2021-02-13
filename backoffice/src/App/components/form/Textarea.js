import React from 'react';

// CSS
import './_Textarea.scss';

const Textarea = ({ defaultValue, placeholder, id, name, label, whenChanging, required }) => {
  return (
    <>
      <label className="textarea__label" htmlFor={name}>{label}</label>
      {
        required ? (
          <textarea className="textarea__field" name={name} id={id} placeholder={placeholder} defaultValue={defaultValue} onChange={whenChanging} required />
        ) : (
          <textarea className="textarea__field" name={name} id={id} placeholder={placeholder} defaultValue={defaultValue} onChange={whenChanging} />
        )
      }
    </>
  );
};

export default Textarea;