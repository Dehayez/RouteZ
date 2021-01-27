import { default as React, useCallback, useEffect, useState } from 'react';

import './PageLayout.scss';

// Import services
import { useAuth, useApi } from '../services';

// Import config
import { apiConfig } from '../config';

// Import components
import { Navigation, Header } from '../components'


const PageLayout = ({ children }) => {
    // Use services
    const { getMyself, currentUser } = useAuth();
    const { getSignPosts } = useApi();

    // All accessable data
    const [ signPosts, setSignPosts ] = useState();
    const [ user, setUser ] = useState();
	const [ avatar, setAvatar ] = useState();

	const pageTitle = 'Dashboard';

    const getAllData = useCallback(() => {
        const easyFetch = async () => {
            // All user information
            if (currentUser) {
              const userData = await getMyself(currentUser.token);
              setUser(userData);
  
              // Get users avatar, if he has one
              if (userData.profile.avatar) {
                  setAvatar(userData.profile.avatar);
              };
  
              // All signposts
              const signPostsData = await getSignPosts(currentUser.token);
              setSignPosts(signPostsData);
            };
        };

        easyFetch();
    }, [getMyself, getSignPosts, currentUser]);

    useEffect(() => {
        getAllData();
    }, [getAllData]);

  return (
    <div className="page">
        {/** Deze route gebruiken voor een afbeelding, best een alternatieve foto tonen als gebruiker geen avatar heeft */}
        {
            avatar ? (
                <img src={`${apiConfig.baseURL}file/${avatar}`} alt="avatar"/>
            ) : ''
        }
		<Navigation/>
        {/** Voor de wegwijzers best zoals de avatar het icoontje gaan ophalen vanuit de back-end */}
      <main className="page-main">
		<Header pageTitle={pageTitle}/>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;