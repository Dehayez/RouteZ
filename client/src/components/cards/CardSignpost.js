import React, { useCallback, useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

// Import components
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Link } from 'react-router-dom';

import './Cards.scss';

const CardSignpost = ({endpoint, index, title, text, logo, alt, percentage }) => {
	const [ logoResult, setLogoResult ] = useState();

	const fetchSvg = useCallback(async () => {
		await fetch(logo, {
			method: "GET",
		}).then(async (res) => setLogoResult(await res.text()));
	}, [logo]);

	useEffect(() => {
		fetchSvg();
	}, [fetchSvg]);

	setTimeout(() => {
		const shape = document.getElementsByTagName("svg")[0];
		if (shape) shape.setAttribute("viewBox", "0 0 150 120"); 
	}, 200);

  return (
	  <Link className="signpost-card" to={endpoint}>
		<h1 className="signpost-card__title">{index}. {title}</h1>
		<p className="signpost-card__text">{text}</p>
		<div className="signpost-card-bottom">
			<div className="signpost-card-bottom__icon-wrapper">
				<div className="signpost-card-bottom__icon">
					{
						ReactHtmlParser(logoResult)
					}
				</div>
			</div>
			<div className="signpost-card-bottom__percentage">
				<CircularProgressbar value={ percentage } strokeWidth={8} text={`${ percentage }%`} styles={buildStyles({
					rotation: 0,
					pathTransitionDuration: 2,
					pathColor: '#4A84FC',
					textColor: '#4A84FC',
					trailColor: '#DDECFE',
					textSize: '18px',
				})} />
			</div>
		</div>
	</Link>
  );
};

export default CardSignpost;
