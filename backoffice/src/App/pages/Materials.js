import React, { useCallback, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useApi, useAuth } from '../services';

// Components
import { DeleteButton, UsualButton } from '../components';

// Routes
import * as Routes from '../routes';

const Materials = () => {
  // Routing
  const history = useHistory();

  // Services
  const { getMaterials, deleteMaterial } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ materials, setMaterials ] = useState();

  // Fetch
  const getData = useCallback(async () => {
    try {
      const data = await getMaterials(currentUser.token);
      setMaterials(data);
    } catch (e) {
      console.log(e);
    };
  }, [getMaterials, currentUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Delete
  const deleteItem = async (id) => {
    await deleteMaterial(currentUser.token, id);
    window.location.reload();
  };

  return (
    <UsualLayout>
      <Row>
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h1 className="overview__title">
            Alle materialen
          </h1>
          <UsualButton text="Materiaal maken" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="overview__items">
            {
              materials && materials.map((material, index) => {
                return (
                  <div className="overview__items--item d-flex justify-content-between align-items-center" key={index}>
                    <div className="overview__items--item--text">
                      <h5 onClick={() => history.push(Routes.MATERIAL.replace(':id', material._id))}>{material.title}</h5>
                      <h6>{material.type}</h6>
                    </div>
                    <div className="overview__items--item--buttons align-items-center justify-content-end">
                      <UsualButton text="Bewerk" action={() => history.push(Routes.EDIT_MATERIAL.replace(':id', material._id))} />
                      <DeleteButton text="Verwijder" action={() => deleteItem(material._id)} />
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

export default Materials;
