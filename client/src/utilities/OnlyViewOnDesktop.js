import React from 'react';

// Images
import Logo from '../assets/logos/RouteZ-logo-color.png';

const OnlyViewOnDesktop = ({ children }) => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return width < 992 ? (
    <div className="no-desktop">
      <div className="no-desktop__wrapper">
        <div className="no-desktop__logo">
          <img src={Logo} alt="logo" />
        </div>
        <p>Dit platform is enkel toegankelijk via een laptop of desktop. Tot op heden is er geen mobiele versie beschikbaar.</p>
      </div>
    </div>
  ) : children;
};

export default OnlyViewOnDesktop;
