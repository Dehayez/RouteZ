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

const Modules = () => {
  // Routing
  const history = useHistory();

  // Services
  const { getModules, deleteModule } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ modules, setModules ] = useState();

  // Fetch
  const getData = useCallback(async () => {
    try {
      const data = await getModules(currentUser.token);
      setModules(data);
    } catch (e) {
      console.log(e);
    };
  }, [getModules, currentUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Delete
  const deleteItem = async (id) => {
    await deleteModule(currentUser.token, id);
    window.location.reload();
  };

  return (
    <UsualLayout>
      <Row>
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h1 className="overview__title">
            Alle modules
          </h1>
          <UsualButton text="Module maken" action={() => history.push(Routes.CREATE_MODULE)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="overview__items">
            {
              modules && modules.map((moduleItem, index) => {
                return (
                  <div className="overview__items--item d-flex justify-content-between align-items-center" key={index}>
                    <div className="overview__items--item--text">
                      <h5 onClick={() => history.push(Routes.MODULE.replace(':id', moduleItem._id))}>{moduleItem.title}</h5>
                      <h6>Bevat {moduleItem._pathIds ? moduleItem._pathIds.length : 0} paden</h6>
                    </div>
                    <div className="overview__items--item--buttons d-flex align-items-center justify-content-end">
                      <UsualButton text="Bewerk" action={() => history.push(Routes.EDIT_MODULE.replace(':id', moduleItem._id))} />
                      <DeleteButton text="Verwijder" action={() => deleteItem(moduleItem._id)} />
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

export default Modules;
