import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import services
import { useApi, useAuth } from '../../services';

// Import config
import { apiConfig } from '../../config';

// Routes
import * as Routes from '../../routes';

// Partials
import NotificationsPopup from './NotificationsPopup';

// Components
import ReactTooltip from 'react-tooltip';

// Icons
import { IoMdNotificationsOutline } from 'react-icons/io';

import { DefaultImage } from '../../assets/images';

import './Header.scss' 

const Header = () => {
	// Routing
	const history = useHistory();

	const url = window.location.pathname.split('/');

    // Use services
    const { getMyself, currentUser } = useAuth();
		const { getNotifications, readNotifications } = useApi();

    // All accessable data
    const [ user, setUser ] = useState();
    const [ avatar, setAvatar ] = useState();
		const [ searchKeywords, setSearchKeywords ] = useState();
		const [ notifications, setNotifications ] = useState();
		const [ unseenNotifications, setUnseenNotifications ] = useState(false);
		const [ showNotifications, setShowNotifications ] = useState(false);

    const getAllData = useCallback(() => {
        const easyFetch = async () => {
            // All user information
            const userData = await getMyself(currentUser.token);
						const notificationsData = await getNotifications(currentUser.token);
						setNotifications(notificationsData);
            setUser(userData);

						let arrayOfUnseen = [];

						for (let i = 0; i < notificationsData.length; i++) {
							if (notificationsData[i].seen === false) {
								arrayOfUnseen.push(notificationsData[i]);
							};
						};

						setUnseenNotifications(arrayOfUnseen);

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

	// Change state for searches
	const watchChanges = (e) => {
		setSearchKeywords(e.target.value);
	};

	// Submit search
	const submitSearch = (e) => {
		e.preventDefault();

		history.push(Routes.SEARCH_RESULTS, {keywords: searchKeywords});
	};

	// View notifications
	const viewNotifications = async (bool) => {
		if (bool == true) {
			await readNotifications(currentUser.token);
			setShowNotifications(true);
		} else {
			setShowNotifications(false);
		};
	};
	
  return (
    <header className="header">
		<div className="header-left">
			<h1 className="header-left-title">
				{
					url.includes('dashboard') ? 'Dashboard' : 
					url.includes('settings') ? 'Instellingen' : 
					url.includes('my-profile') ? 'Mijn profiel' : 
					url.includes('profile') ? 'Profiel' : 
					url.includes('my-materials') ? 'Mijn materiaal' : 
					url.includes('materials') ? 'Materiaal' : 
					url.includes('material') ? 'Materiaal' : 
					url.includes('create-material') ? 'Materiaal' : 
					url.includes('search-results') ? 'Zoeken' : 
					url.includes('notifications') ? 'Meldingen' : 

					'Wegwijzers'
				}
			</h1>
		</div>

			<div className="header-right">
				<form onSubmit={(e) => submitSearch(e)}>
					<input onChange={(e) => watchChanges(e)} className="header-right-input" id="search-engine" type="text" placeholder="Zoek"/>
				</form>

				<span className="header-notifications" data-tip data-for='notifications' data-event='click focus' onClick={() => viewNotifications(!showNotifications)}>
					{
						notifications && unseenNotifications.length !== 0 && <div className="header-notifications__checked"></div>
					}
					<IoMdNotificationsOutline className="header-right-icon"/>
				</span>

				
					{
						showNotifications && (
							<ReactTooltip className='react-tooltip' type="light" effect='solid' id='notifications' clickable='true' globalEventOff='click'>
								<NotificationsPopup notifications={unseenNotifications} hide={() => setUnseenNotifications(false)} />
							</ReactTooltip>
						)
					}

				<div className="header-right-profile">
					<div className="header-right-profile__text">
						{ 
							user && (
								<Link className="header-right-profile__text-name-link" to={Routes.MY_PROFILE}>
									<p className="header-right-profile__text-name">{user.profile.firstName + ' ' + user.profile.lastName}</p>
								</Link>
							)
						}
						<Link className="header-right-profile__text-settings-link" to={Routes.MY_PROFILE_SETTINGS}>
							<p className="header-right-profile__text-settings">Instellingen</p>
						</Link>
					</div>
					<Link className="header-right-profile__image-link" to={Routes.MY_PROFILE}>
						{
							avatar ? (
								<img className="header-right-profile__image" src={`${apiConfig.baseURL}file/${avatar}`} alt="profile"/>
							) : <img className="header-right-profile__image" src={ DefaultImage } alt="profile"/>
						}
					</Link>
				</div>
			</div>
	</header>
  );
};

export default Header;