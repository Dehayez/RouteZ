import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Importing services
import { useAuth } from '../services';

const Login = () => {
	const { signIn } = useAuth();
    const history = useHistory();

    const [ error, setError ] = useState({
        "visible": false,
        "message": "",
    });

    const [ formData, setFormData ] = useState({
        "email": "",
        "password": "",
    });

    const loginUser = async (e) => {
		e.preventDefault();
		
		const result = await signIn(formData.email, formData.password);

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
		<form onSubmit={(e) => loginUser(e)}>
			<label htmlFor="email">E-mail</label>
			<input type="email" name="email" id="email" onChange={(e) => changeData(e)} required/>
			<label htmlFor="email">Wachtwoord</label>
			<input type="password" name="password" id="password" onChange={(e) => changeData(e)} required/>
			<button type="submit">
                Inloggen maar, joch!
            </button>
		</form>
		{
            error.visible && error.message
        }
	</>
  )
};

export default Login;