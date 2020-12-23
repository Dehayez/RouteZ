import React, { useCallback, useEffect, useState } from 'react';

// Import services
import { useAuth } from '../services';

const MyProfile = () => {
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

            // Get users avatar, if he has one
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
        <></>
    )
};

export default MyProfile;