import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Importing services
import { useApi, useAuth } from '../../services';

// Import components
import { NavigationItem } from './'
import { Link } from 'react-router-dom';
import { LogoColor } from '../../assets/logos';

import * as Routes from '../../routes';

// Import config
import { apiConfig } from '../../config';

import './Navigation.scss' 

const Navigation = () => {
	const history = useHistory();

    const { getSignPosts } = useApi();
    const { currentUser } = useAuth();

    // Some important states
    const [ signposts, setSignposts ] = useState();

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            if (currentUser) {
                const signpostsData = await getSignPosts(currentUser.token);
                setSignposts(signpostsData);
            };
        };

        fetchData();
    }, [ getSignPosts, currentUser ]);

    useEffect(() => {
        getAllData();
    }, [ getAllData ]);

    // Going to specific signpost
    const goToSign = async (id) => {
        history.push(`/signposts/${id}`);
	};
	

	return (
		<div className="nav">
			<Link className="nav-header" to="/dashboard">
				<img className="nav-header__image" src={LogoColor}/>
			</Link>

			<nav className="nav-list">
				{
					signposts && signposts.map((signpost, i) => {
						return <NavigationItem 
									key={i} 
									index={i+1}
									title={signpost.shortedTitle} 
									alt={signpost.shortedTitle} 
									endpoint={`/signposts/${signpost.id}`} 
									logo={`${apiConfig.baseURL}svg/${signpost.icon}`}
								/>
					})
				}
			</nav>
			
			<Link className="nav-link" to={Routes.SIGNPOSTS}>Alle wegwijzers</Link>

		</div>
	);

};

export default Navigation;