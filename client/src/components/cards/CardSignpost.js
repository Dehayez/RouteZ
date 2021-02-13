import React from 'react';

// Import components
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Link } from 'react-router-dom';

import './Cards.scss';

const CardSignpost = ({endpoint, index, title, text, logo, alt, percentage }) => {


  return (
	  <Link to={endpoint}>
		<div className="signpost-card">
			<h1 className="signpost-card__title">{index}. {title}</h1>
			<p className="signpost-card__text">{text}</p>

			<div className="signpost-card-bottom">
				<div className="signpost-card-bottom__icon-wrapper">
					<img className="signpost-card-bottom__icon" src={logo} alt={alt}/>
				</div>
				<div className="signpost-card-bottom-percentage">
					<CircularProgressbar value={ percentage } strokeWidth={8} styles={buildStyles({
						rotation: 0,
						pathTransitionDuration: 2,
						pathColor: '#4A84FC',
						trailColor: '#DDECFE',
					})} />
				</div>
			</div>
		</div>
	</Link>
  );
};

export default CardSignpost;
