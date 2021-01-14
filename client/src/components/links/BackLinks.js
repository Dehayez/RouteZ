import React from 'react';
import { NavLink } from 'react-router-dom';

const BackLinks = ({links}) => {
  return (
    <div>
      {
        links && links.map((link, index) => {
          return <NavLink key={index} to={link.path}>
            {link.route}
          </NavLink>
        })
      }
    </div>
  );
};

export default BackLinks;
