import { default as React } from 'react';
import {Container, Row, Col} from 'react-bootstrap'

import './AuthLayout.scss';

const AuthLayout = ({children}) => {
  return (
	<div className="page">
		<Container className="page-main auth">
			<Row>
				<Col sm={7} className="auth-left">
					<div className="auth-left-frame">
						<img className="auth-left-frame__image" src=""></img>
						waar zitte
					</div>
				</Col>
				<Col sm={5} className="auth-right">
						<img src="..." alt="..." className="img-thumbnail"></img>
					{children}
				</Col>
			</Row>
		</Container>
	</div>
  );
};

export default AuthLayout;