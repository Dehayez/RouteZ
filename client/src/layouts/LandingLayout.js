import { default as React } from 'react';

import './LandingLayout.scss';

// Bootstrap
import { Navbar, Nav } from 'react-bootstrap';

// Components
import { LogoColor } from '../assets/logos';
import { Link as LinkScroll, animateScroll as scroll  } from 'react-scroll';

// Scroll indicator
import ProgressBar from "react-scroll-progress-bar";

const LandingLayout = ({children}) => {

  return (
	  <>
		<div className="navbar-wrapper">
			<Navbar className="navbar slide-in-top" expand="lg" fixed="top">
				<Navbar.Brand className="navbar-brand" onClick={() => scroll.scrollToTop()}>
					<img className="navbar-brand__image" alt="RouteZ" src={LogoColor}/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkScroll className="navbar-link" activeClass="navbar-link--active" to="routez" offset={-350}  smooth={true} duration={1000} spy={true}>
							Wat is RouteZ
						</LinkScroll>
						<LinkScroll className="navbar-link" activeClass="navbar-link--active" to="signposts" offset={-350} smooth={true} duration={1000} spy={true}>
							Wegwijzers
						</LinkScroll>
						<LinkScroll className="navbar-link" activeClass="navbar-link--active" to="plan" offset={-350}  smooth={true} duration={1000} spy={true}>
							Stappenplan
						</LinkScroll>
						<LinkScroll className="navbar-link" activeClass="navbar-link--active" to="we" offset={-350}  smooth={true} duration={1000} spy={true}>
							Wie zijn we
						</LinkScroll>
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
	</>
  );
};

export default LandingLayout;