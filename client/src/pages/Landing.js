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
import { Row, Col } from 'react-bootstrap';

// Carousel 
import Carousel from 'react-elastic-carousel';

// Scroll animate
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

// Icons
import { BsChevronDown } from 'react-icons/bs';

// Images
import { LandingIllustration, WegwijzerLanding, Plan1, Plan2, Plan3, Plan4 } from '../assets/images';

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

	const [ carouselItems, setCarouselItems ] = useState([
		{
			id: 1, 
			title: 'Leren',
			text: 'Leer bij door wegwijzer na wegwijzer te volgen en zo de theorie onder de knie te krijgen!',
			image: Plan1,
		},
		{
			id: 2, 
			title: 'Progressie',
			text: 'Volg uw eigen progressie op de voet! Een eenvoudige klik op uw profielpagina en u ziet hoe ver u de route gevolgd hebt per wegwijzer.',
			image: Plan2,
		},
		{
			id: 3, 
			title: 'Ontdek materiaal',
			text: 'Hoe pas je de theorie nu precies toe? Ontdek het tussen de verschillende materialen!',
			image: Plan3,
		},
		{
			id: 4, 
			title: 'Plaats eigen materiaal',
			text: 'Naast het ontdekken van andermans materiaal, kunt u ook eigen praktijkvoorbeelden plaatsen! Zo helpt u ook heel wat andere leerkrachten. Team work makes the dream work.',
			image: Plan4,
		},
	  ]);

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

				<LinkScroll className="landing-top-chevron bounce-top" to="routez" smooth={true} duration={1000} offset={-220}>
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

			<AnimationOnScroll animateIn="animate__fadeInLeft" animateOut="animate__fadeOutRight">
				<div className="landing-section landing-section--one" id="routez">
					<div className="landing-section--one">
						<h2 className="landing-section--one__title">Wat is RouteZ?</h2>
						<p className="landing-section--one__text">RouteZ is een platform om leerkrachten te <strong className="landing-section__strong">ondersteunen</strong> in hun didactisch handelen met betrekking tot zelfgestuurd leren in een <strong className="landing-section__strong">krachtige leeromgeving.</strong> Aan de hand van aan de hand van <strong className="landing-section__strong">concrete voorbeelden en toepassingen</strong> wordt je ondersteund  bij het implementeren van zelfgestuurd leren in de lespraktijk. </p>
						<Link to={Routes.DASHBOARD}>
							<ButtonSmall color="primary" content="Ontdek het platform"/>
						</Link>
					</div>
				</div>
			</AnimationOnScroll>

			
				<div className="landing-section landing-section--two" id="signposts">
					
							<h1 className="landing-section--two__title">Wegwijzers</h1>
							<Row>
								<Col className="landing-section--two-left__text" lg="7">
									<p>Het platform besteedt bijzondere aandacht aan de <strong className="landing-section__strong">eigenheid van elke leerling</strong> (zelfgestuurd leren voor alle leerlingen), van elke leerkracht en de verschillende rollen die ze moeten opnemen. </p>

									<p>Een krachtige leeromgeving, rekening houdend met de <strong className="landing-section__strong">7 principes</strong> voor zelfgestuurd leren in krachtige leeromgevingen. 
									Deze 7 principes hebben als doel je wegwijs te maken doorheen het proces van zelfgestuurd leren. </p>

									<p>Elke wegwijzer staat voor een bepaald principe. Deze wordt opgebouwd uit <strong className="landing-section__strong">verschillende modules</strong> die zowel theorie (tips & tricks, filmpjes ...) als oefeningen omvatten.</p>
									<Link to={Routes.DASHBOARD}>
										<ButtonSmall color="primary" content="Bekijk de 7 principes"/>
									</Link>
								</Col>
								<Col className="landing-section--two-right" lg="5">
									<img className="landing-section--two-right__image" src={ WegwijzerLanding } alt="wegwijzer"/>
								</Col>
							</Row>
					
				</div>

			<AnimationOnScroll animateIn="animate__fadeInLeft" animateOut="animate__fadeOutRight">
				<div className="landing-section landing-section--three" id="plan">
					<h1 className="landing-section--two__title">Stappenplan</h1>

					<Carousel className="carousel">
						{carouselItems.map(item => 
							<div key={item.id} >
								<img src={item.image} alt={item.title}/>
								<h3>{item.title}</h3>
								<p>{item.text}</p>
							</div>)}
					</Carousel>
				</div>
			</AnimationOnScroll>

			<div className="landing-section landing-section--four" id="we">

				<h1 className="landing-section--four__title">Door en voor ...</h1>
				<Row>
					<Col className="landing-section--four-left__text" lg="7">
						<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo? Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo?</p>
					</Col>
					<Col className="landing-section--four-right" lg="5">
						<img className="landing-section--four-right__image" src={ WegwijzerLanding } alt="wegwijzer"/>
						<img className="landing-section--four-right__image" src={ WegwijzerLanding } alt="wegwijzer"/>
						<img className="landing-section--four-right__image" src={ WegwijzerLanding } alt="wegwijzer"/>
					</Col>
				</Row>
			</div>
        </div>
    )
};

export default Landing;