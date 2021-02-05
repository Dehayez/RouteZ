import React from 'react';
import HtmlParser from 'react-html-parser';

// Components
import Order from './Order';

const Theory = ({content, order}) => {
  return (
    <>
      <h3>{content.title}</h3>
      <h5>{content.type}</h5>
      <h4>{content.theoryText[order-1].title && content.theoryText[order-1].title}</h4>
      {
        content.theoryText[order-1].content && HtmlParser(content.theoryText[order-1].content)
      }
      <Order paths={content.theoryText} pathId={content._id} />
    </>
  );
};

export default Theory;
