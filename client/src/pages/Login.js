import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// Importing services
import { useAuth } from '../services';

// Importing components
import { ButtonLarge }  from '../components/buttons';
import FloatingLabelInput from 'react-floating-label-input';

const Login = ({ onChange, value }) => {
	
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
            [e.target.id]: e.target.value,
		});
    };
  return (
	<div className="auth-content">
		<h1 className="title title--large">Welkom aan boord!</h1>
		<form className="form"  onSubmit={(e) => loginUser(e)}>

			<div className="form-input" style={{ fontSize: 16 }}>
				<FloatingLabelInput
				id="email"
				label="E-mail"
				type="email"
				onChange={(e) => changeData(e)} required
				autoFocus
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
			<Link className="form-link form-link--bottom" to="/reset">Wachtwoord vergeten?</Link>

			<ButtonLarge content="Log in"></ButtonLarge>
			<Link className="form-link form-link--top" to="/signup">Nog geen account? <b>Registreer hier</b></Link>
		</form>
		{
            error.visible && error.message
        }
	</div>
  )
};

export default Login;