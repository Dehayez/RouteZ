import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Importing services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

const MyProfileSettings = () => {
    const history = useHistory();

    // Using auth and api services
    const { currentUser, getMyself, editMyself, deleteMyself, logout } = useAuth();
    const { uploadFile } = useApi();

    // Some important states
    const [ user, setUser ] = useState();
    const [ error, setError ] = useState();
    const [ success, setSuccess ] = useState();
    const [ remove, setRemove ] = useState();

    const [ formData, setFormData ] = useState({
        'avatar': '',
        'firstName': '',
        'lastName': '',
        'email': '',
        'phoneNumber': '',
        'schoolName': '',
        'professionalFunction': '',
    });

    const getAllData = useCallback(() => {
        const fetchTheData = async () => {
            if (currentUser) {
                const userData = await getMyself(currentUser.token);
                setUser(userData);

                // Default values for form
                if (userData) {
                    setFormData({
                        avatar: userData.profile.avatar ? userData.profile.avatar : '', 
                        firstName: userData.profile.firstName,
                        lastName: userData.profile.lastName,
                        email: userData.email,
                        phoneNumber: userData.profile.phoneNumber ? userData.profile.phoneNumber : '',
                        schoolName: userData.profile.schoolName ? userData.profile.schoolName : '',
                        professionalFunction: userData.profile.professionalFunction ? userData.profile.professionalFunction : '',
                    });
                };
            };
        };

        fetchTheData();
    }, [getMyself, currentUser]);

    const submitSettings = async (e) => {
        e.preventDefault();

        const result = await editMyself(currentUser.token, formData);

        // Error handling
        if (!result || result.error) {
            setError(result.error ? result.error : 'Jouw account kon niet worden geupdate.');
            return;
        };

        // Show success message
        setSuccess(true);
    };

    /** Staat niet in het design maar misschien een knop voorzien om een account te verwijderen */
    const removeUser = async () => {
        // Deleting the user
        const result = await deleteMyself(currentUser.token);

        // Remove token out localStorage
        await logout();

        if (!result || result.error) {
            setError('Jouw account kon niet verwijderd worden');
            return;
        };

        // Redirect to the homepage
        history.push(Routes.LANDING);
    };

    const changeImage = async (e) => {
        // Get file
        const file = e.target.files[0];

        // Upload to server
        const result = await uploadFile(file);

        if (!result) {
            setError('Jouw foto kon niet worden geupload.');
            return;
        };

        // Place name into formdata
        setFormData({
            ...formData,
            avatar: result.filename,
        });

        // Set error to zero
        setError('');
    };

    const changeForms = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    return (
        <>
            <form onSubmit={(e) => submitSettings(e)}>
                <input type="file" accept="image/*" id="avatar" onChange={(e) => changeImage(e)} />
                <input type="text" id="firstName" onChange={(e) => changeForms(e)} defaultValue={formData ? formData.firstName : ''} required/>
                <input type="text" id="lastName" onChange={(e) => changeForms(e)} defaultValue={formData ? formData.lastName : ''} required/>
                <input type="email" id="email" onChange={(e) => changeForms(e)} defaultValue={formData ? formData.email : ''} required/>
                <input type="tel" id="phoneNumber" onChange={(e) => changeForms(e)} defaultValue={formData ? formData.phoneNumber : ''}/>
                <input type="text" id="schoolName" onChange={(e) => changeForms(e)} defaultValue={formData ? formData.schoolName : ''}/>
                <textarea id="professionalFunction" onChange={(e) => changeForms(e)} defaultValue={formData ? formData.professionalFunction : ''}/>
                <button type="submit">Bevestig</button>
            </form>
            {
                remove ? (
                    <>
                        <button onClick={() => removeUser()}>
                            Ja, zeker!
                        </button>
                        <button onClick={() => setRemove(!remove)}>
                            Neen!
                        </button>
                    </>
                ) : (
                    <button onClick={() => setRemove(true)}>
                        Ik wil mijn account verwijderen
                    </button>
                )
            }
            {
                error && error
            }
            {
                success && success
            }
        </>
    )
};

export default MyProfileSettings;