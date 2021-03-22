import React from 'react';
import { Link } from 'react-router-dom';

// Routes
import * as Routes from '../../routes';

import './Footer.scss' 

const Footer = () => {
	
  return (
	  <>
		<footer className="footer">
			<div className="footer-left">
				<Link className="footer__link" to={Routes.SIGNPOSTS}>Wegwijzers</Link>
				<Link className="footer__link" to={Routes.DASHBOARD}>Dashboard</Link>
				<Link className="footer__link" to={Routes.MY_PROFILE}>Mijn profiel</Link>
				<Link className="footer__link" to={Routes.MATERIALS}>Materiaal</Link>
				<Link className="footer__link" to={Routes.SEARCH_RESULTS}>Zoeken</Link>
				<Link className="footer__link" to={Routes.FAQ}>FAQ</Link>
			</div>
			<div className="footer-right">
				<Link className="footer__link" to="/privacy-policy">Privacy Policy</Link>
				<Link className="footer__link" to="/terms-of-service">Algemene voorwaarden</Link>
			</div>
		</footer>
		<div className="footer-spacer">
			&nbsp;
		</div>
	</>
  );
};

export default Footer;