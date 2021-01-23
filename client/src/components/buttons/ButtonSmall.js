import { default as React } from 'react';

import './Buttons.scss'

const ButtonSmall = ({ content, color }) => {

  return (
	  <button className={"btn btn--small btn--" + color} type="submit"> { content } </button>
  );

};

export default ButtonSmall;