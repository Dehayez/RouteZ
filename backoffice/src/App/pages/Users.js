import React, { useCallback, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useApi, useAuth } from '../services';

// Routes
import * as Routes from '../routes';

const Users = () => {
  // Routing
  const history = useHistory();

  // Services
  const { getUsers } = useApi();
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

  return (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="overview__title">
            Alle gebruikers
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="overview__items">
            {
              users && users.map((user, index) => {
                return (
                  <div className="overview__items--item" key={index}>
                    <div className="overview__items--item--text">
                      <h5 onClick={() => history.push(Routes.USER.replace(':id', user._id))}>{user.profile.firstName + ' ' + user.profile.lastName}</h5>
                      <h6>{user.email}</h6>
                    </div>
                    <div className="overview__items--item--buttons">
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
