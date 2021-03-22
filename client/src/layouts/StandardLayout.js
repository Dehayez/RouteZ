import React from 'react';
import { Link } from 'react-router-dom';

const StandardLayout = ({ children }) => {
  return (
    <>
    <div className="full-page">
      {children}
    </div>
    <footer className="landing-footer">
			<Link className="landing-footer-link" to="/privacy-policy">Privacy policy</Link>
			<Link className="landing-footer-link" to="/terms-of-service">Algemene voorwaarden</Link>
		</footer>
    </>
  )
};

export default StandardLayout;