import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';

// Import services
import { useAuth, useApi } from '../services';

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
            module && (
                <>
                {
                    ReactHtmlParser(module.content)
                }
                </>
            )
        }
        </>
    )
};

export default Module;