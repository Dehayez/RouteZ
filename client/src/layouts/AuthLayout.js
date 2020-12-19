import { default as React } from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import illustration from '../assets/illustrations/welcome-illustation.svg';
import logo from '../assets/logos/RouteZ-logo-color.png'

import './AuthLayout.scss';


const AuthLayout = ({children}) => {
	
  return (
	<div className="page">
		<Container className="page-main auth">
			<Row>
				<Col md={8} className="auth-left">
					<div className="auth-left-frame">
						<img className="auth-left-frame__image" src={illustration} alt="illustration"></img>
					</div>
				</Col>
				<Col md={4} className="auth-right">
						<img src={logo} alt="RouteZ" className="auth-right-logo"></img>
					{children}
				</Col>
			</Row>
		</Container>
	</div>
  );
};

export default AuthLayout;