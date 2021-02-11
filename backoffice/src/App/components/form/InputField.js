import React from 'react';

// CSS
import './_InputField.scss';

const InputField = ({ defaultValue, placeholder, id, name, type, label, whenChanging, required }) => {
  return (
    <>
      <label className="input-field__label" htmlFor={name}>{label}</label>
      {
        required ? (
          <input className="input-field__field" type={type} name={name} id={id} placeholder={placeholder} defaultValue={defaultValue} onChange={whenChanging} required />
        ) : (
          <input className="input-field__field" type={type} name={name} id={id} placeholder={placeholder} defaultValue={defaultValue} onChange={whenChanging} />
        )
      }
    </>
  );
};

export default InputField;
