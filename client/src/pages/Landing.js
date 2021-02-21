import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// Importing services
import { useAuth } from '../services';

import * as Routes from '../routes';

// Components
import { ButtonSmall, ButtonLarge } from '../components';
import FloatingLabelInput from 'react-floating-label-input';
import { Link as LinkScroll } from 'react-scroll';

// Bootstrap 
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'

// Icons
import { BsChevronDown } from 'react-icons/bs';

// Images
import { LandingIllustration } from '../assets/images';

import "animate.css/animate.min.css";

const Landing = () => {
	const { signIn } = useAuth();
    const history = useHistory();

    const [ error, setError ] = useState({
        "visible": false,
        "message": "",
    });

    const [ formData, setFormData ] = useState({
        "email": "",
        "password": "",
    });

    const loginUser = async (e) => {
		e.preventDefault();
		
		const result = await signIn(formData.email, formData.password);

        // Check if user already exists
        if (result.error) {
            setError({
                visible: true,
                message: result.error,
            });

            return;
        };

        // Send user to dashboard
        history.push('/dashboard');
    };

    const changeData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
		});
    };

    return (
        <div className="landing">
			<div className="landing-top">

				<div className="landing-top-circle-wrapper-wrapper">
					<div className="landing-top-circle-wrapper">
						<div className="landing-top-circle slide-in-top"/>
					</div>
				</div>

				<LinkScroll className="landing-top-chevron bounce-top" to="routez" smooth={true} duration={1000}>
					<BsChevronDown />
				</LinkScroll>

				<Row>
					<Col className="landing-top-left slide-in-left" lg={6}>
						<h1 className="landing-top-left__title">Route<span>Z</span></h1>
						<p className="landing-top-left__text">
							hét platform voor zelfgestuurd leren in een krachtige leeromgeving!
							<span> - door en voor leerkrachten</span>
						</p>
							<img className="landing-top-left__image" src={ LandingIllustration } alt="RouteZ"/>
					
					</Col>

					<Col className="landing-top-right scale-in-center" lg={6}>
						<div className="landing-top-right-login">
							<h1 className="landing-top-right-title title title--large">Welkom bij deze tocht!</h1>
							<form className="landing-top-right-form"  onSubmit={(e) => loginUser(e)}>

								<div className="landing-top-right-form-input" style={{ fontSize: 16 }}>
									<FloatingLabelInput
									id="email"
									label="E-mail"
									type="email"
									onChange={(e) => changeData(e)} required
									/>
								</div>
								<div className="landing-top-right-form-input" style={{ fontSize: 16 }}>
									<FloatingLabelInput
									id="password"
									label="Wachtwoord"
									type="password"
									onChange={(e) => changeData(e)} required
									/>
								</div>
								<Link className="landing-top-right-form-link landing-top-right-form-link--bottom" to="/reset">Wachtwoord vergeten?</Link>

								<ButtonLarge content="Log in"></ButtonLarge>
								<Link className="landing-top-right-form-link landing-top-right-form-link--top" to="/signup">Nog geen account? <b>Registreer hier</b></Link>
							</form>
							<p className="landing-top-right-error">
								{
									error.visible && error.message
								}
							</p>
						</div>
					</Col>
				</Row>
			</div>
			
				<div className="landing-section landing-section--one" id="routez">
					<div className="landing-section--one">
						<h2 className="landing-section--one__title">Wat is RouteZ?</h2>
						<p className="landing-section--one__text">RouteZ is een platform om leerkrachten te <strong className="landing-section__strong">ondersteunen</strong> in hun didactisch handelen met betrekking tot zelfgestuurd leren in een <strong className="landing-section__strong">krachtige leeromgeving.</strong> Aan de hand van aan de hand van <strong className="landing-section__strong">concrete voorbeelden en toepassingen</strong> wordt je ondersteund  bij het implementeren van zelfgestuurd leren in de lespraktijk. </p>
						<Link to={Routes.DASHBOARD}>
							<ButtonSmall color="primary" content="Ontdek het platform"/>
						</Link>
					</div>
				</div>

			<div className="landing-section landing-section--two" id="signposts">
				<h1 className="landing-section--two__title">Wegwijzers</h1>
				<Row>
					<Col className="landing-section--two-left__text" lg="7">
						Het platform besteedt bijzondere aandacht aan de eigenheid van elke leerling (zelfgestuurd leren voor alle leerlingen), van elke leerkracht en de verschillende rollen die ze moeten opnemen. 

						Een krachtige leeromgeving, rekening houdend met de 7 principes voor zelfgestuurd leren in krachtige leeromgevingen. 
						Deze 7 principes hebben als doel je wegwijs te maken doorheen het proces van zelfgestuurd leren. 

						Elke wegwijzer staat voor een bepaald principe. Deze wordt opgebouwd uit verschillende modules die zowel theorie (tips & tricks, filmpjes ...) als oefeningen omvatten.
					</Col>
					<Col lg="5">
						<img src="" alt="wegwijzer"/>
					</Col>
				</Row>
			</div>

			<div className="landing-section landing-section--three" id="plan">
				<h1 className="landing-section--two__title">Stappenplan</h1>
				<Carousel>
					<Carousel.Item interval={2000}>
						<img
						className="d-block w-100"
						src="holder.js/800x400?text=First slide&bg=373940"
						alt="First slide"
						/>
						<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={2000}>
						<img
						className="d-block w-100"
						src="holder.js/800x400?text=Second slide&bg=282c34"
						alt="Second slide"
						/>
						<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={2000}>
						<img
						className="d-block w-100"
						src="holder.js/800x400?text=Third slide&bg=20232a"
						alt="Third slide"
						/>
						<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>

			<div className="landing-section landing-section--four" id="we">
				
			</div>
        </div>
    )
};

export default Landing;