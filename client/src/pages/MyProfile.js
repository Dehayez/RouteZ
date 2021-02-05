import React, { useCallback, useEffect, useState } from 'react';

// Import services
import { useAuth } from '../services';

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

	console.log(user);
	console.log(getMyself);
	console.log(currentUser);

    return (
        <div className="profile">
			<div className="profile-buttons">
				<ButtonSmall content="Mijn materiaal" color="primary"/>
				<ButtonSmall content="Instellingen" color="secondary"/>
			</div>

			<div className="profile-info">
				<div className="profile-info__image">
					<img src={ DefaultImage } alt="annelies"/>
				</div>
				<div className="profile-info__text">
					{/* <p className="profile-info__text-name">{user.profile.firstName + ' ' +  user.profile.lastName}</p>
					<p className="profile-info__text-mail">{user.email}</p> */}
					<p className="profile-info__text-school">@TODO schoolfunctie</p>
				</div>
			</div>

			<Progress/>
		</div>
    )
};

export default MyProfile;