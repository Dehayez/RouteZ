import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ButtonLarge }  from '../components/buttons';
import FloatingLabelInput from 'react-floating-label-input';

// Importing some services
import { useAuth } from "../services";

const Register = () => {
    const { signUp } = useAuth();
    const history = useHistory();

    const [ error, setError ] = useState({
        "visible": false,
        "message": "",
    });

    const [ formData, setFormData ] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
        "passwordRepeat": "",
    });

    const registerUser = async (e) => {
        e.preventDefault();

        // Check if password is the same
        if (formData.password !== formData.passwordRepeat) {
            setError({
                visible: true,
                message: "De ingevulde wachtwoord zijn niet hetzelfde"
            });

            return;
        };

        const result = await signUp(formData.email, formData.password, formData.firstname, formData.lastname);

        // Check if user already exists
        if (result.error) {
            setError({
                visible: true,
                message: result.error,
            });

            return;
        };

        // Send user to dashboard
        history.push('/dashboard');
    };

    const changeData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="auth-content">
            <form className="form" onSubmit={(e) => registerUser(e)}>
				<h1 className="title title--large">Registreer</h1>
               {/*  <label htmlFor="firstname">Voornaam</label>
                <input type="text" name="firstname" id="firstname" onChange={(e) => changeData(e)} required/>
                <label htmlFor="lastname">Achternaam</label>
                <input type="text" name="lastname" id="lastname" onChange={(e) => changeData(e)} required/>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" onChange={(e) => changeData(e)} required/>
                <label htmlFor="password">Wachtwoord</label>
                <input type="password" name="password" id="password" onChange={(e) => changeData(e)} required/>
                <label htmlFor="passwordRepeat">Herhaal wachtwoord</label>
                <input type="password" name="passwordRepeat" id="passwordRepeat" onChange={(e) => changeData(e)} required/>
                <input type="checkbox" name="restrictions" id="restrictions" required /> */}
				<div className="form-input" style={{ fontSize: 16 }}>
					<FloatingLabelInput
					id="firstname"
					label="Voornaam"
					type="text"
					onChange={(e) => changeData(e)} required
					autofocus
					/>
				</div>
				<div className="form-input" style={{ fontSize: 16 }}>
					<FloatingLabelInput
						id="lastname"
						label="Achternaam"
						type="text"
						onChange={(e) => changeData(e)} required
					/>
				</div>
				<div className="form-input" style={{ fontSize: 16 }}>
					<FloatingLabelInput
						id="email"
						label="E-mail"
						type="email"
						onChange={(e) => changeData(e)} required
					/>
				</div>
				<div className="form-input" style={{ fontSize: 16 }}>
					<FloatingLabelInput
						id="password"
						label="Wachtwoord"
						type="password"
						onChange={(e) => changeData(e)} required
					/>
				</div>
				<div className="form-input" style={{ fontSize: 16 }}>
					<FloatingLabelInput
						id="passwordRepeat"
						label="Herhaal wachtwoord"
						type="password"
						onChange={(e) => changeData(e)} required
					/>
				</div>
				<div class="form-restrictions">
					<input type="checkbox" name="restrictions" id="restrictions" required />
					<span class="form-restrictions-text">Ik accepteer de <b>algemene voorwaarden</b></span>
				</div>

                <ButtonLarge content="Registreer"></ButtonLarge>
				<Link className="form-link form-link--top" to="/signin">Al een account? <b>Meld aan</b></Link>
            </form>
            {
                error.visible && error.message
            }
        </div>
    )
};

export default Register;