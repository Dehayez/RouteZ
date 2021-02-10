import React from 'react';
import { Container } from 'react-bootstrap';

// CSS
import './_AuthLayout.scss';

// Images
import Logo from '../assets/logos/RouteZ-logo-color.png';

const AuthLayout = ({ children }) => {
  return (
    <main className="auth">
      <div className="auth__upper">
        <img src={Logo} alt="logo" />
      </div>
      <Container>
        { children }
      </Container>
    </main>
  );
};

export default AuthLayout;
