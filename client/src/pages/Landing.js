import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// Importing services
import { useAuth } from '../services';

// Bootstrap 
import { Container, Row, Col } from 'react-bootstrap';

// Components
import { ButtonSmall, ButtonLarge } from '../components'
import FloatingLabelInput from 'react-floating-label-input';

// Icons
import { BsChevronDown } from 'react-icons/bs'

// Images
import { Background } from '../assets/images'

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
			<Container className="landing-top">

				<div className="landing-top-circle-wrapper-wrapper">
					<div className="landing-top-circle-wrapper">
						<div className="landing-top-circle slide-in-top"/>
					</div>
				</div>

				{/* <div className="landing-top-background "/> */}
				<a className="landing-top-chevron bounce-top " href="#routez">
					<BsChevronDown />
				</a>

				<Row>
					<Col className="landing-top-left slide-in-left" lg={6}>
						<h1 className="landing-top-left__title">Route<span>Z</span></h1>
						<p className="landing-top-left__text">
							hét platform voor zelfgestuurd leren in een krachtige leeromgeving!
							<span> - door en voor leerkrachten</span>
						</p>
					</Col>

					<Col className="landing-top-right scale-in-center" lg={5}>
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
			</Container>

			<div className="landing-section landing-section--one" id="routez">
				<h2>Wat is RouteZ?</h2>
				<p>RouteZ is een platform om leerkrachten te ondersteunen in hun didactisch handelen met betrekking tot zelfgestuurd leren in een krachtige leeromgeving. Aan de hand van aan de hand van concrete voorbeelden en toepassingen wordt je ondersteund  bij het implementeren van zelfgestuurd leren in de lespraktijk. </p>
				<ButtonSmall color="primary" content="Ontdek het platform"/>
			</div>

			<div className="landing-section landing-section--two" id="signposts">
				
			</div>

			<div className="landing-section landing-section--three" id="plan">
				
			</div>

			<div className="landing-section landing-section--four" id="we">
				
			</div>
        </div>
    )
};

export default Landing;