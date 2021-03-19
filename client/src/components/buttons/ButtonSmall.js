import { default as React } from 'react';

import './Buttons.scss'

const ButtonSmall = ({ content, color, onClick }) => {

  return (
	  <button className={"btn btn--small btn--" + color } type="submit" onClick={onClick}> { content } </button>
  );

};

export default ButtonSmall;