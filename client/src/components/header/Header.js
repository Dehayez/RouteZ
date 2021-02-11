import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import services
import { useAuth } from '../../services';

// Import config
import { apiConfig } from '../../config';

// Routes
import * as Routes from '../../routes';

// Import icons
import { IoMdNotificationsOutline } from 'react-icons/io';

import { DefaultImage } from '../../assets/images';

import './Header.scss' 

const Header = ({pageTitle}) => {
		// Routing
		const history = useHistory();

    // Use services
    const { getMyself, currentUser } = useAuth();

    // All accessable data
    const [ user, setUser ] = useState();
    const [ avatar, setAvatar ] = useState();
	const [ searchKeywords, setSearchKeywords ] = useState();

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

	// Change state for searches
	const watchChanges = (e) => {
		setSearchKeywords(e.target.value);
	};

	// Submit search
	const submitSearch = (e) => {
		e.preventDefault();

		history.push(Routes.SEARCH_RESULTS, {keywords: searchKeywords});
	};
	
  return (
    <header className="header">
		<div className="header-left">
			<h1 className="header-left-title">{pageTitle}</h1>
		</div>

		<div className="header-right">
			<form onSubmit={(e) => submitSearch(e)}>
				<input onChange={(e) => watchChanges(e)} className="header-right-input" id="search-engine" type="text" placeholder="Zoek"/>
			</form>
			{/* <IoMdNotificationsOutline className="header-right-icon"/> */}
			<Link className="header-right-profile" to="/my-profile">
				<div className="header-right-profile__text">
					{ 
						user && (
							<p className="header-right-profile__text-name">{user.profile.firstName + ' ' + user.profile.lastName}</p>
						)
					}
					<p className="header-right-profile__text-settings">Instellingen</p>
				</div>
				{
					avatar ? (
						<img className="header-right-profile__image" src={`${apiConfig.baseURL}file/${avatar}`} alt="profile"/>
					) : <img className="header-right-profile__image" src={ DefaultImage } alt="profile"/>
				}
			</Link>
		</div>
    </header>
  );
};

export default Header;