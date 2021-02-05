import React from 'react';

// Import components
import { ProgressItem } from './'

import './Progress.scss' 

const percentage = 80;
const percentage2 = 60;
const percentage3 = 20;
const percentage4 = 100;
const title = 'Aanleren';

const Progress = () => {

	return (
		<div className="progression">
			<h4 className="progression-title">Progressie</h4>
			<div className="progression-charts">
				<ProgressItem percentage={percentage4} title={title} />
				<ProgressItem percentage={percentage4} title={title} />
				<ProgressItem percentage={percentage2} title={title} />
				<ProgressItem percentage={percentage3} title={title} />
				<ProgressItem percentage={percentage} title={title} />
				<ProgressItem percentage={percentage2} title={title} />
				<ProgressItem percentage={percentage} title={title} />
			</div>
		</div>
	);

};

export default Progress;