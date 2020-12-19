import React, { useState } from 'react';
import { Link } from "react-router-dom";
import FloatingLabelInput from 'react-floating-label-input';
import { ButtonLarge }  from '../components/buttons';

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
        <div className="auth-content">
			<h1 className="title title--large">Wachtwoord vergeten?</h1>
            <form className="form" onSubmit={(e) => sendRequest(e)}>
                {/* <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" onChange={(e) => changeData(e)} required/> */}
				<div className="form-input" style={{ fontSize: 16  }}>
					<FloatingLabelInput
					id="email"
					label="E-mail"
					type="email"
					onChange={(e) => changeData(e)} required
					autofocus
					/>
				</div>			
				<ButtonLarge content="Verzend aanvraag"></ButtonLarge>
            </form>
			<Link className="form-link form-link--top" to="/signin">Annuleren</Link>
            {
                message.visible && message.message
            }
            {
                error.visible && error.message
            }
        </div>
    )
};

export default SendReset;