import React, { useState } from 'react';

// Icons
import { IoIosArrowForward } from 'react-icons/io'

const Faq = () => {

	const [ active, setActive ] = useState(false);
	const faqItems = [
		{
			id: 1, 
			question: 'Hoe werkt het platform?',
			answer: 'Zie filmpje (komt nog) ',
		},
		{
			id: 2, 
			question: 'Hoe registreer ik?',
			answer: '<p>Om alle mogelijkheden van RouteZ te benutten en om alle wegwijzers te kunnen bekijken, moet je je eerst registreren. <ul> <li>Surf naar <a href="www.route-z.be" target="_blank">www.route-z.be</a></li><li>Klik onder “Log in” op “Registreer hier” </li> <li>Vul je naam, voornaam en e-mailadres in waarmee je je wil registeren. Kies ook een wachtwoord.</li> <li>Wanneer je alle velden ingevuld hebt, klik je onderaan op de blauwe knop “Registreer”. </li> <li>Nu kan je naar hartenlust je weg zoeken op RouteZ! Het is steeds mogelijk je gegevens aan te passen onder “profiel”.</li></ul></p>',
		},
		{
			id: 3, 
			question: 'Ik ben mijn wachtwoord vergeten. Wat nu? ',
			answer: '<p>Wachtwoord vergeten? Geen zorgen! Je kan op de volgende manier een nieuw wachtwoord aanvragen: <ul> <li> Bij het inloggen kan je klikken op “wachtwoord vergeten?” </li>  <li>Een nieuwe pagina opent zich en je wordt gevraagd je e-mailadres in te tikken. Gebruik het e-mailadres waarmee je geregistreerd bent op RouteZ. Klik daarna op ‘Nieuw wachtwoord aanvragen’. </li> <li>Even daarna krijg je een mail van RouteZ. Klik op de link in de mail. Daaronder kies je zelf een nieuw wachtwoord. Je moet dat wachtwoord twee keer intikken. Klik dan op ‘Wachtwoord bijwerken’. Je kan nu aanmelden met het nieuwe wachtwoord. </li> </ul></p>',
		},
		{
			id: 4, 
			question: 'Mag iedereen lid worden van RouteZ? ',
			answer: 'RouteZ is een leerplatform die ontworpen is door en voor leerkrachten. We doelen voornamelijk op leerkrachten die voor de klas staan in het lager als het middelbaar onderwijs. ',
		},
		{
			id: 5, 
			question: 'Werkt RouteZ op elke computer? En op mijn smartphone?',
			answer: 'Als je computer niet ouder is dan 5 jaren wellicht wel, toch als je een recente browser gebruikt. We adviseren het gebruik van een moderne browser zoals Chrome, Firefox, Edge of Safari. Gebruik best altijd de meest recente versie. <br/>Jammer genoeg werkt RouteZ (nog) niet op smartphones.',
		},
		{
			id: 6, 
			question: 'Ik heb een inhoudelijke vraag in verband met een bepaald geüpload materiaal, maar weet niet wie te contacteren?',
			answer: 'Op de pagina waar je het materiaal in kwestie terug vindt, is er aan de rechter kant wat extra info waaronder de naam van de auteur. Wanneer je met je pijltje op de naam gaat staan, verschijnt er een extra vakje. <br/>Hierin staan de contactgegevens (e-mailadres en eventueel telefoonnummer) waarmee je de persoon in kwestie kan contacteren via je eigen e-mailadres. ',
		},
		{
			id: 7, 
			question: 'Hoe omgaan met auteursrechten? ',
			answer: 'https://www.klascement.net/auteursrechten/ letterlijk overnemen? ',
		},
		{
			id: 8, 
			question: 'Ik heb het antwoord op mijn vraag hier niet gevonden. Wat nu?',
			answer: 'Nog steeds niet het juiste antwoord gevonden? <br/>Dan kan je admin@routez.be contacteren voor verdere hulp. ',
		},
	];
	
	const Faq = ({ content }) => {
		const [ show, setShow ] = useState(false);

		return (
			<div className={show ? 'faq-items-item faq-items-item--active' : 'faq-items-item'} >
				<div className="faq-items-item-question" onClick={() => setShow(!show)}>
					<p className={show ? 'faq-items-item-question__text faq-items-item-question__text--active' : 'faq-items-item-question__text'}> {content.question} </p>
					<IoIosArrowForward className={show ? 'faq-items-item-question__icon faq-items-item-question__icon--active' : 'faq-items-item-question__icon'}/>
				</div>
				{
					show && (
						<div className='faq-items-item-answer' dangerouslySetInnerHTML={ {__html: content.answer}} />
					)
				}
			</div>
		)
	};

    return (
        <div className="faq">
			<h1 className="faq__title">Veelgestelde vragen</h1>
			<div className="faq-items">
				{
					faqItems.map((item, i) => {
						return <Faq key={i} content={item} />
					})
				}
			{/* {faqItems.map(item => 
					<div className={active ? 'faq-items-item faq-items-item--active' : 'faq-items-item'} key={item.id} onClick={() => setActive(!active)}>
						<div className="faq-items-item-question">
							<p className={active ? 'faq-items-item-question__text faq-items-item-question__text--active' : 'faq-items-item-question__text'}> {item.question} </p>
							<IoIosArrowForward className={active ? 'faq-items-item-question__icon faq-items-item-question__icon--active' : 'faq-items-item-question__icon'}/>
						</div>
						<div className={active ? 'faq-items-item-answer faq-items-item-answer--active' : 'faq-items-item-answer'} dangerouslySetInnerHTML={ {__html: item.answer}}>
							
						</div>
					</div>)} */}
			</div>
        </div>
    )
};

export default Faq;