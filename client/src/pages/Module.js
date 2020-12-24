import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

// Import services
import { useAuth, useApi } from '../services';

// Import routes 
import * as Routes from '../routes';

const Module = () => {
    const { id } = useParams();

    // Services
    const { getModule } = useApi();
    const { currentUser } = useAuth();

    // Some states
    const [ module, setModule ] = useState();

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            if (currentUser) {
                const moduleData = await getModule(currentUser.token, id);
                setModule(moduleData);
            };
        };

        fetchData();
    }, [getModule, currentUser]);

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    return (
        <>
        {
            module ? (
                ''
            ) : (
                <Redirect to={Routes.NOT_FOUND} />
            )
        }
        </>
    )
};

export default Module;