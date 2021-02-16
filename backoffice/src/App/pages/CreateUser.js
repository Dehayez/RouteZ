import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Components
import { InputField, Checkbox, Message, UsualButton } from '../components';

// Services
import { useApi, useAuth } from '../services';

// Routes
import * as Routes from '../routes';

const CreateUser = () => {
  // Routing
  const history = useHistory();

  // Services
  const { createUser } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ admin, setAdmin ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ form, setForm ] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  // On change
  const whenChanging = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create user
  const createItem = async () => {
    try {
      await createUser(currentUser.token, {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        role: admin ? 'admin' : 'user',
      });

      history.push(Routes.USERS);
    } catch (e) {
      setError(true);
    };
  };

  return (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Gebruiker maken
          </h1>
        </Col>
      </Row>
      <div className="create__form">
        <Row>
          <Col xs={12}>
            <InputField 
              type="email"
              name="email"
              placeholder="bv. mijn_naam@routez.be"
              id="email"
              defaultValue=""
              required={true}
              label="E-mail"
              whenChanging={(e) => whenChanging(e)}
            />
            <InputField 
              type="password"
              name="password"
              placeholder="bv. Een uniek wachtwoord"
              id="password"
              defaultValue=""
              required={true}
              label="Wachtwoord"
              whenChanging={(e) => whenChanging(e)}
            />
            <InputField 
              type="text"
              name="firstName"
              placeholder="bv. Jantje"
              id="firstName"
              defaultValue=""
              required={true}
              label="Voornaam"
              whenChanging={(e) => whenChanging(e)}
            />
            <InputField 
              type="text"
              name="lastName"
              placeholder="bv. De Visser"
              id="lastName"
              defaultValue=""
              required={true}
              label="Achternaam"
              whenChanging={(e) => whenChanging(e)}
            />
            <div className="create__form--check">
              <h5>Welke rol neemt deze gebruiker in?</h5>
              <Checkbox 
                checked={admin === true ? true : false}
                id={true}
                label="Admin"
                setChecked={setAdmin}
              />
              <Checkbox 
                checked={admin === false ? true : false}
                id={false}
                label="Gebruiker"
                setChecked={setAdmin}
              />
            </div>
            {
              error && <Message text="Deze gebruiker kon niet worden gemaakt" />
            }
            <div className="create__form--submit d-flex justify-content-end">
              <UsualButton text="Maak gebruiker" action={createItem} />
            </div>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  );
};

export default CreateUser;
