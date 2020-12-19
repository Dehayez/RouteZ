import { default as React } from 'react';

import './Buttons.scss'

const ButtonLarge = ({ content }) => {

  return (
	  <button className="btn btn--large btn--primary" type="submit"> { content } </button>
  );

};

export default ButtonLarge;