import React from 'react';

// Import components
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

import './Progress.scss' 

const ProgressItem = ({title, percentage, endpoint }) => {

	return (
		<Link className="progression-chart" to={endpoint}>
			<h6 className="progression-chart__title">{ title }</h6>
			<div className="progression-chart__percentage">
				<CircularProgressbar value={ percentage } strokeWidth={8} text={`${ percentage }%`} styles={buildStyles({
					rotation: 0,
					textSize: '18px',
					pathTransitionDuration: 2,
					pathColor: '#4A84FC',
					textColor: '#4A84FC',
					trailColor: '#DDECFE',
				})} />
			</div>
		</Link>
	);

};

export default ProgressItem;