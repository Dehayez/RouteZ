import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Importing services
import { useApi, useAuth } from '../services';

const Signposts = () => {
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
	
	console.log(signposts);

    return (
        <div>
        {
            signposts && signposts.map((element, index) => {
                return ''
            })
        }
        </div>
    )
};

export default Signposts;