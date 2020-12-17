import React, { useState } from 'react';

// Importing services
import { useAuth } from '../services';

const SendReset = () => {
    const { sendReset } = useAuth();
    const [ error, setError ] = useState({
        "visible": false,
        "message": "",
    });

    const [ message, setMessage ] = useState({
        "visible": false,
        "message": "Er is een e-mail verstuurd om jouw wachtwoord te wijzigen.",
    });

    const [ formData, setFormData ] = useState({
        "email": "",
    });

    const sendRequest = async (e) => {
        e.preventDefault();

        const result = await sendReset(formData.email);

        if (result.error) {
            setError({
                visible: true,
                message: result.error,
            });

            return;
        };

        setMessage({
            ...message,
            visible: true,
        });

        setError({
            visible: false,
            message: '',
        });
    };

    const changeData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <form onSubmit={(e) => sendRequest(e)}>
                <h1>Zije je wachtwoord vergeten ti??</h1>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" onChange={(e) => changeData(e)} required/>
                <button type="submit">Kwil ne nieuweeeee</button>
            </form>
            {
                message.visible && message.message
            }
            {
                error.visible && error.message
            }
        </>
    )
};

export default SendReset;