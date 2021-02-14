import React from 'react';

// Bootstrap
import { Row, Col } from 'react-bootstrap';

// Components
import { Link } from 'react-router-dom';

// Images
import { BackSignpost } from '../assets/images'

// Routes
import * as Routes from '../routes';

const NotFound = () => {

    return (
        <Row className="error">
			<Col className="error-left" md={8}>
				<h1 className="error-left__404">404</h1>
				<h3 className="error-left__title">Oh nee, we zijn de weg kwijt</h3>
				<p className="error-left__text">
					De pagina dat je aan het zoeken bent ligt niet op onze route. Volg de wegwijzer om terug op de juiste weg te belanden.
				</p>
			</Col>
			<Col className="error-right" md={4}>
				<Link to={Routes.DASHBOARD}>
					<img className="error-right__image" src={BackSignpost} alt="terug"/>
				</Link>
			</Col>
        </Row>
    )
};

export default NotFound;