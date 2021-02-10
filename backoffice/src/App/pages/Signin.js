import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// Layouts
import { AuthLayout } from '../layouts';

// Components
import { InputField, LargeSubmitButton, Message } from '../components';

// Services
import { useAuth } from '../services';

// Routes
import * as Routes from '../routes';

const Signin = () => {
  // Routing
  const history = useHistory();

  // States
  const [ form, setForm ] = useState({
    email: '',
    password: '',
  });

  const [ error, setError ] = useState(false);

  // Services
  const { signInAdmin } = useAuth();

  // Watch all changes
  const changeForm = (e) => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value,
    });
  };

  // Submit signin
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const data = await signInAdmin(form.email, form.password);

      if (data.error) {
        setError(true);
        return;
      };

      // history.push(Routes.DASHBOARD);
    } catch (e) {
      setError(true);
    };
  };

  return (
    <AuthLayout>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center" xs={12} md={10} lg={6}>
          <section className="auth__section">
            <form onSubmit={(e) => submitForm(e)}>
              <InputField 
                name="email"
                id="email"
                label="E-mail"
                placeholder="Jouw e-mail"
                defaultValue=""
                required={true}
                type="email"
                whenChanging={(e) => setForm(e)}
              />
              <InputField 
                name="password"
                id="password"
                label="Wachtwoord"
                placeholder="Jouw wachtwoord"
                defaultValue=""
                required={true}
                type="password"
                whenChanging={(e) => setForm(e)}
              />
              {
                error && <Message text="Aanmelden mislukt" />
              }
              <LargeSubmitButton
                text="Aanmelden"
              />
            </form>
          </section>
        </Col>
      </Row>
    </AuthLayout>
  );
};

export default Signin;
