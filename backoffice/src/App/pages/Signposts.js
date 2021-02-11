import React, { useCallback, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useApi, useAuth } from '../services';

// Routes
import * as Routes from '../routes';

const Signposts = () => {
  // Routing
  const history = useHistory();

  // Services
  const { getSignPosts } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ signposts, setSignposts ] = useState();

  // Fetch
  const getData = useCallback(async () => {
    try {
      const data = await getSignPosts(currentUser.token);
      console.log(data)
      setSignposts(data);
    } catch (e) {
      console.log(e);
    };
  }, [getSignPosts, currentUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="overview__title">
            Alle wegwijzers
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="overview__items">
            {
              signposts && signposts.map((signpost, index) => {
                return (
                  <div className="overview__items--item" key={index}>
                    <div className="overview__items--item--text">
                      <h5 onClick={() => history.push(Routes.SIGNPOST.replace(':id', signpost._id))}>{signpost.title}</h5>
                      <h6>Bevat {signpost.modules.length} modules</h6>
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

export default Signposts;
