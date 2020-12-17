import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Importing services
import { useAuth } from '../services';

const SubmitReset = () => {
    const { token } = useParams();
    const { submitReset } = useAuth();
    const history = useHistory();

    const [ error, setError ] = useState({
        "visible": false,
        "message": "",
    });

    const [ message, setMessage ] = useState({
        "visible": false,
        "message": "Jouw wachtwoord is gewijzigd.",
    });

    const [ formData, setFormData ] = useState({
        "password": "",
    });

    const submitRequest = async (e) => {
        e.preventDefault();

        const result = await submitReset(token, formData.password);

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

        setTimeout(() => {
            history.push('/');
        }, (5000));
    };

    const changeData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <form onSubmit={(e) => submitRequest(e)}>
                <h1>Iere, meugt een nieuwtjen en</h1>
                <input type="password" name="password" id="password" onChange={(e) => changeData(e)} required />
                <button type="submit">
                    Tis goeeed
                </button>
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

export default SubmitReset;