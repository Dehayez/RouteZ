import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ButtonLarge }  from '../components/buttons';
import FloatingLabelInput from 'react-floating-label-input';

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
        <div className="auth-content">
            <form className="form" onSubmit={(e) => submitRequest(e)}>
				<h1 className="title title--large">Wachtwoord veranderen</h1>
                {/* <input type="password" name="password" id="password" onChange={(e) => changeData(e)} required /> */}
				<div className="form-input sendreset-input" style={{ fontSize: 16 }}>
					<FloatingLabelInput
					id="email"
					label="E-mail"
					type="email"
					onChange={(e) => changeData(e)} required
					/>
				</div>
				<ButtonLarge content="Ga verder"></ButtonLarge>

            </form>
            {
                message.visible && message.message
            }
            {
                error.visible && error.message
            }
        </div>
    )
};

export default SubmitReset;