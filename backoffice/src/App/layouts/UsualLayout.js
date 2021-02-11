import React from 'react';
import { Container } from 'react-bootstrap';

// Components
import { Header } from '../components';

// CSS
import './_UsualLayout.scss';

const UsualLayout = ({ children }) => {
  return (
    <main className="usual">
      <Header />
      <Container className="usual__content">
        { children }
      </Container>
    </main>
  );
};

export default UsualLayout;
