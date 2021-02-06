import React from 'react';
import HtmlParser from 'react-html-parser';

// Components
import Order from './Order';

import './Paths.scss';

const Theory = ({content, order}) => {
  return (
    <>
		<h3 className="path-title">{content.title}</h3>
		<p className="path-type">{content.type}</p>

		<h4 className="path-content__title">{content.theoryText[order-1].title && content.theoryText[order-1].title}</h4>
	  	<div className="path-content__text">
			{ content.theoryText[order-1].content && HtmlParser(content.theoryText[order-1].content) }
		</div>
      	<Order paths={content.theoryText} pathId={content._id} />
    </>
  );
};

export default Theory;
