import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import 'moment/locale/nl-be';

// Import services
import { useAuth } from '../services';

// Import routes
import * as Routes from '../routes';

// Import components
import { ButtonLarge, Progress } from '../components';
import { SelectionIllustration } from '../assets/illustrations';

const Dashboard = () => {
		// Routing
		const history = useHistory();

    // Use services
    const { getMyself, currentUser } = useAuth();

    // All accessable data
    const [ user, setUser ] = useState();
    const [ avatar, setAvatar ] = useState();
		const [ timeOfTheDay, setTimeOfTheDay ] = useState();

    const getAllData = useCallback(() => {
        const easyFetch = async () => {
            // All user information
            const userData = await getMyself(currentUser.token);
            setUser(userData);

            // Get users avatar, if has one
            if (userData.profile.avatar) {
                setAvatar(userData.profile.avatar);
            };

						const hours = Moment(Date.now()).hours();

						if (hours < 11) {
							setTimeOfTheDay('Goeiemorgen');
						};

						if (hours >= 11 && hours <= 13) {
							setTimeOfTheDay('Goeiemiddag');
						};

						if (hours > 13 && hours < 18) {
							setTimeOfTheDay('Goeienamiddag');
						};

						if (hours >= 18) {
							setTimeOfTheDay('Goeienavond');
						};
        };

        easyFetch();
    }, [getMyself, currentUser.token]);

    useEffect(() => {
		getAllData();
	}, [getAllData]);



    return user ? (
        <div className="dashboard">
			<div className="dashboard-card">
				<div className="dashboard-card-content">
					<div className="dashboard-card-content-text">
					{ 
						user.progress._lastSignpost && (
							<>
								<h3 className="dashboard-card-content-text__title">{timeOfTheDay}, {user.profile.firstName}!</h3>
								<p className="dashboard-card-content-text__text">Je was voor het laatst gebleven aan wegwijzer "{user.progress._lastSignpost.title}" in de module "{user.progress._lastModule.title}"</p>
							</>
						)
					}
					</div>
					{
						user.progress._lastSignpost && (
							<div onClick={() => history.push(Routes.MODULE.replace(':id', user.progress._lastModule._id))} className="dashboard-card-content-button">
								<ButtonLarge content="Ga verder"/>
							</div>
						)
					}
				</div>
				<div className="dashboard-card-image">
					<img className="dashboard-card-image__image" src={ SelectionIllustration } alt="RouteZ"/>
				</div>
			</div>

			<Progress/>
        </div>
    ) : ''
};

export default Dashboard;