import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Components
import { InputField, Checkbox, Message, UsualButton } from '../components';

// Services
import { useApi, useAuth } from '../services';

// Routes
import * as Routes from '../routes';

const EditUser = () => {
  // Routing
  const history = useHistory();
  const { id } = useParams();

  // Services
  const { editUser, getUser } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ admin, setAdmin ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ user, setUser ] = useState();
  const [ form, setForm ] = useState({
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

  // Edit user
  const editItem = async () => {
    try {
      await editUser(currentUser.token, user._id, {
        firstName: form.firstName,
        lastName: form.lastName,
        role: admin ? 'admin' : 'user',
      });

      history.push(Routes.USERS);
    } catch (e) {
      setError(true);
    };
  };

  // Fetch user
  const fetchUser = useCallback(async () => {
    const result = await getUser(currentUser.token, id);
    setUser(result);
    setForm({
      firstName: result.profile.firstName,
      lastName: result.profile.lastName,
    });
    setAdmin(result.role === "admin" ? true : false);
  }, [getUser, currentUser, id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return user ? (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Gebruiker bewerken
          </h1>
        </Col>
      </Row>
      <div className="create__form">
        <Row>
          <Col xs={12}>
            <InputField 
              type="text"
              name="firstName"
              placeholder="bv. Jantje"
              id="firstName"
              defaultValue={form.firstName}
              required={true}
              label="Voornaam"
              whenChanging={(e) => whenChanging(e)}
            />
            <InputField 
              type="text"
              name="lastName"
              placeholder="bv. De Visser"
              id="lastName"
              defaultValue={form.lastName}
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
              <UsualButton text="Bewerk gebruiker" action={editItem} />
            </div>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  ) : '';
};

export default EditUser;
