import React, { useCallback, useEffect, useState } from 'react';

// Import services
import { useAuth } from '../../services';

import { Link } from 'react-router-dom';
// Import icons
import { IoMdNotificationsOutline } from 'react-icons/io';

import { DefaultImage } from '../../assets/images';

import './Header.scss' 

const Header = ({pageTitle}) => {
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
    <header className="header">
		<div className="header-left">
			<h1 className="header-left-title">{pageTitle}</h1>
		</div>

		<div className="header-right">
			<input className="header-right-input" type="text" placeholder="Zoek"/>
			<IoMdNotificationsOutline className="header-right-icon"/>
			<Link className="header-right-profile" to="my-profile">
				<div className="header-right-profile__text">
					<p className="header-right-profile__text-name">user.profile.name</p>
					<p className="header-right-profile__text-settings">Instellingen</p>
				</div>
				<img className="header-right-profile__image" src={ DefaultImage } alt="profile"/>
			</Link>
		</div>
    </header>
  );
};

export default Header;