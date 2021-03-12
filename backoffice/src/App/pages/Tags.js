import React, { useCallback, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useApi, useAuth } from '../services';

// Components
import { UsualButton, DeleteButton } from '../components';

// Routes
import * as Routes from '../routes';

const Tags = () => {
  // Routing
  const history = useHistory();

  // Services
  const { getTags, deleteTag } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ tags, setTags ] = useState();

  // Fetch
  const getData = useCallback(async () => {
    try {
      const data = await getTags();
      setTags(data);
    } catch (e) {
      console.log(e);
    };
  }, [getTags]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Delete
  const deleteItem = async (id) => {
    await deleteTag(id, currentUser.token);
    window.location.reload();
  };

  return (
    <UsualLayout>
      <Row>
        <Col xs={12} className="d-flex align-items-center justify-content-between">
          <h1 className="overview__title">
            Alle tags
          </h1>
          <UsualButton text="Tag maken" action={() => history.push(Routes.CREATE_TAG)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="overview__items">
            {
              tags && tags.map((tag, index) => {
                return (
                  <div className="overview__items--item d-flex justify-content-between align-items-center" key={index}>
                    <div className="overview__items--item--text">
                      <h5>{tag.name}</h5>
                    </div>
                    <div className="overview__items--item--buttons d-flex align-items-center">
                      <UsualButton text="Bewerk" action={() => history.push(Routes.EDIT_TAG.replace(':id', tag._id))} />
                      <DeleteButton text="Verwijder" action={() => deleteItem(tag._id)} />
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

export default Tags;
