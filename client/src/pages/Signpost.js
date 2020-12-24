import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';

// Import services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

const Signpost = () => {
    const { id } = useParams();
    const history = useHistory();

    // Services
    const { getSignPost } = useApi();
    const { currentUser } = useAuth();

    // Some states
    const [ signpost, setSignpost ] = useState();

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            if (currentUser) {
                const signpostData = await getSignPost(currentUser.token, id);
                setSignpost(signpostData);
            };
        };

        fetchData();
    }, [getSignPost, currentUser, id]);

    const goToModule = (id) => {
        history.push(`/modules/${id}`);
    };

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    return (
        <>
        {
            signpost ? (
                signpost._moduleIds && signpost._moduleIds.map((element, index) => {
                    return ''
                })
            ) : (
                <Redirect to={Routes.NOT_FOUND} />
            )
        }
        </>
    )
};

export default Signpost;