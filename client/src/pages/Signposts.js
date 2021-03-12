import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { CardSignpost } from '../components';
import { BackLinks } from '../components';

// Importing services
import { useAuth } from '../services';

// Import config
import { apiConfig } from '../config';

// Routes
import * as Routes from '../routes';

const Signposts = () => {
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

    return (
        <div className="signposts">
		{
			progress && (
				<BackLinks 
					links={[
						{
							path: `${Routes.SIGNPOSTS}`,
							route: "wegwijzers "
						},
					]}
				/>
			)
		}
			<h1 className="signposts-title">Zelfgestuurd leren ...</h1>
			<div className="signposts-items">
				{
					progress && progress.map((signpost, i) => {
						return signpost.published ? <CardSignpost 
									key={i}
									index={i+1}
									title={signpost.signpost.title} 
									text={signpost.signpost.text} 
									alt={signpost.signpost.shortedTitle} 
									endpoint={`/signposts/${signpost.signpost.id}`} 
									logo={`${apiConfig.baseURL}file/${signpost.signpost.icon}`}
									percentage={signpost.progress.percentage}
								/> : ''
					})
				}
			</div>
        </div>
    )
}

export default Signposts;