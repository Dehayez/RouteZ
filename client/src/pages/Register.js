import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
        <>
            <form onSubmit={(e) => registerUser(e)}>
                <label htmlFor="firstname">Voornaam</label>
                <input type="text" name="firstname" id="firstname" onChange={(e) => changeData(e)} required/>
                <label htmlFor="lastname">Achternaam</label>
                <input type="text" name="lastname" id="lastname" onChange={(e) => changeData(e)} required/>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" onChange={(e) => changeData(e)} required/>
                <label htmlFor="password">Wachtwoord</label>
                <input type="password" name="password" id="password" onChange={(e) => changeData(e)} required/>
                <label htmlFor="passwordRepeat">Herhaal wachtwoord</label>
                <input type="password" name="passwordRepeat" id="passwordRepeat" onChange={(e) => changeData(e)} required/>
                <input type="checkbox" name="restrictions" id="restrictions" required />
                <button type="submit">
                    Registreren maar, joch!
                </button>
            </form>
            {
                error.visible && error.message
            }
        </>
    )
};

export default Register;