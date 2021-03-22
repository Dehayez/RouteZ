import { default as React } from 'react';
import { Link } from 'react-router-dom';
import './LandingLayout.scss';

// Bootstrap
import { Navbar, Nav } from 'react-bootstrap';

// Components
import { LogoColor } from '../assets/logos';
import { Link as LinkScroll, animateScroll as scroll  } from 'react-scroll';

// Icons 
import { HiMenuAlt3 } from 'react-icons/hi';

// Scroll indicator
import ProgressBar from "react-scroll-progress-bar";
import { RouteIllustration } from '../assets/illustrations';

import * as Routes from '../routes';

const LandingLayout = ({children}) => {

  return (
	  <>
		<div className="navbar-wrapper">
			<Navbar className="navbar slide-in-top" expand="lg" fixed="top">
				<Navbar.Brand className="navbar-brand" onClick={() => scroll.scrollToTop()}>
					<img className="navbar-brand__image" alt="RouteZ" src={LogoColor}/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"><HiMenuAlt3/></Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkScroll className="navbar-link" to="routez" offset={-400}   duration={1000} spy={true}>
							Wat is RouteZ
						</LinkScroll>
						<LinkScroll className="navbar-link" to="signposts" offset={-200}  duration={1000} spy={true}>
							Wegwijzers
						</LinkScroll>
						<LinkScroll className="navbar-link" to="plan" offset={-200}   duration={1000} spy={true}>
							Stappenplan
						</LinkScroll>
						<LinkScroll className="navbar-link" to="we" offset={-400}   duration={1000} spy={true}>
							Wie zijn we
						</LinkScroll>
						<Link className="navbar-link" to={Routes.DASHBOARD} >
							Dashboard
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<div className="progressbar-wrapper">
				<ProgressBar className="progressbar" 
					bgcolor="#4A84FC"
				/>
			</div>
		</div>

		<div className="spacer">
			&nbsp;
		</div>
		<div className="page">
			{children}
		</div>
		<footer className="landing-footer">
			<Link className="landing-footer-link" to="/privacy-policy">Privacy policy</Link>
			<Link className="landing-footer-link" to="/terms-of-service">Algemene voorwaarden</Link>
		</footer>
	</>
  );
};

export default LandingLayout;