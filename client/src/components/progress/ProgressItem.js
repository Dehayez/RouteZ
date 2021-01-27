import React from 'react';

// Import components
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './Progress.scss' 

const ProgressItem = ({title, percentage }) => {

	return (
		<div className="progression-chart">
		<h6 className="progression-chart__title">{ title }</h6>
		<div className="progression-chart__percentage">
			<CircularProgressbar value={ percentage } strokeWidth={percentage/6} text={`${ percentage }%`} styles={buildStyles({
				rotation: 0,
				textSize: '18px',
				pathTransitionDuration: 2,
				pathColor: `rgba(74, 132, 252, ${ percentage / 100})`,
				textColor: '#4A84FC',
				trailColor: '#DDECFE',
			})} />
		</div>
		</div>
	);

};

export default ProgressItem;