import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Import services
import { useAuth, useApi } from '../services';

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
                console.log(signpostData);
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
            signpost && (
                signpost.modules && signpost.modules.map((element, index) => {
                    return ''
                })
            )
        }
        </>
    )
};

export default Signpost;