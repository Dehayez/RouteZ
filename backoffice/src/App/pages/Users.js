import React, { useCallback, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useApi, useAuth } from '../services';

// Routes
import * as Routes from '../routes';

// Components
import { DeleteButton, UsualButton } from '../components';

const Users = () => {
  // Routing
  const history = useHistory();

  // Services
  const { getUsers, deleteUser } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ users, setUsers ] = useState();

  // Fetch
  const getData = useCallback(async () => {
    try {
      const data = await getUsers(currentUser.token);
      setUsers(data);
    } catch (e) {
      console.log(e);
    };
  }, [getUsers, currentUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Delete
  const deleteItem = async (id) => {
    await deleteUser(currentUser.token, id);
    window.location.reload();
  };

  return (
    <UsualLayout>
      <Row>
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h1 className="overview__title">
            Alle gebruikers
          </h1>
          <UsualButton text="Gebruiker maken" action={() => history.push(Routes.CREATE_USER)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="overview__items">
            {
              users && users.map((user, index) => {
                return (
                  <div className="overview__items--item d-flex justify-content-between align-items-center" key={index}>
                    <div className="overview__items--item--text">
                      <h5 onClick={() => history.push(Routes.USER.replace(':id', user._id))}>{user.profile.firstName + ' ' + user.profile.lastName}</h5>
                      <h6>{user.email}</h6>
                    </div>
                    <div className="overview__items--item--buttons align-items-center justify-content-end">
                      <UsualButton text="Bewerk" action={() => history.push(Routes.EDIT_USER.replace(':id', user._id))} />
                      <DeleteButton text="Verwijder" action={() => deleteItem(user._id)} />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Col>
      </Row>
    </UsualLayout>
  );
};

export default Users;
