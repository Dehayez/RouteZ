import { default as React } from 'react';

import './LandingLayout.scss';

// Bootstrap
import { Navbar, Nav } from 'react-bootstrap';

// Components
import { LogoColor } from '../assets/logos';

const LandingLayout = ({children}) => {
  

  return (
	  <>
		<Navbar className="navbar slide-in-top " expand="lg" sticky="top">
			<Navbar.Brand className="navbar-brand" href="/">
				<img className="navbar-brand__image" src={LogoColor}/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#routez">Wat is RouteZ</Nav.Link>
					<Nav.Link href="#signposts">Wegwijzers</Nav.Link>
					<Nav.Link href="#plan">Stappenplan</Nav.Link>
					<Nav.Link href="#we">Wie zijn we</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		<div className="page">
			{children}
		</div>
	</>
  );
};

export default LandingLayout;