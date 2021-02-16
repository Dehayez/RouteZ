import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

// Import services
import { useAuth } from '../services';

// Import config 

import { apiConfig } from '../config';

// Import routes
import * as Routes from '../routes';

// Import component
import { ButtonSmall, Progress } from '../components';
import { DefaultImage } from '../assets/images';

const MyProfile = () => {
    // Use services
    const { getMyself, currentUser } = useAuth();

    // All accessable data
    const [ user, setUser ] = useState();
    const [ avatar, setAvatar ] = useState();

    const getAllData = useCallback(() => {
        const easyFetch = async () => {
            // All user information
            const userData = await getMyself(currentUser.token);
            setUser(userData);

            // Get users avatar, if has one
            if (userData.profile.avatar) {
                setAvatar(userData.profile.avatar);
            };
        };

        easyFetch();
    }, [getMyself, currentUser.token]);

    useEffect(() => {
        getAllData();
	}, [getAllData]);

    return (
        <div className="profile">
			<div className="profile-buttons">
				<Link to={Routes.MY_MATERIALS}>
					<ButtonSmall content="Mijn materiaal" color="primary"/>
				</Link>
				<Link to={Routes.MY_PROFILE_SETTINGS}>
					<ButtonSmall content="Instellingen" color="secondary"/>
				</Link>
			</div>

			<div className="profile-info">
				<div className="profile-info__image">
					{
						avatar ? (
							<img src={`${apiConfig.baseURL}file/${avatar}`} alt="profile"/>
						) : <img src={ DefaultImage } alt="profile"/>
					}
				</div>
				<div className="profile-info__text">

					{ 
						user && (
							<>
								<p className="profile-info__text-name">{user.profile.firstName + ' ' +  user.profile.lastName}</p>
								<p className="profile-info__text-mail">{user.email}</p>
								<p className="profile-info__text-school">{user.profile.schoolName}</p>
							</>
						)
					}
				</div>
			</div>

			<Progress/>
		</div>
    )
};

export default MyProfile;