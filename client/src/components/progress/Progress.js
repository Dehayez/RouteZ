import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import components
import { ProgressItem } from './'

// Services
import { useAuth } from '../../services';

// Routes
import * as Routes from '../../routes';

import './Progress.scss' 

const Progress = () => {
	// Routing
	const history = useHistory();

	// Services
	const { currentUser, getProgress } = useAuth();

	// States
	const [ progress, setProgress ] = useState();

	const fetchProgress = useCallback(async () => {
		try {
			const data = await getProgress(currentUser.token);
			setProgress(data);
		} catch (e) {
			history.push(Routes.NOT_FOUND);
		};
	}, [history, getProgress, currentUser]);

	useEffect(() => {
		fetchProgress();
	}, [fetchProgress]);

	const capitalizeTitle = (s) => {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	return (
		<div className="progression">
			<h4 className="progression-title">Progressie</h4>
			<div className="progression-charts">
				{
					progress && progress.map((item, index) => {
						return <ProgressItem key={index} percentage={item.progress.percentage} title={capitalizeTitle(item.signpost.shortedTitle)} />
					})
				}
			</div>
		</div>
	);

};

export default Progress;