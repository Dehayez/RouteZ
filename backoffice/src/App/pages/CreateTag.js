import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Components
import { InputField } from '../components';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useAuth, useApi } from '../services';

// Routes
import * as Routes from '../routes';

// CSS
import './_Create.scss';

const CreateTag = () => {
  // Routing
  const history = useHistory();

  // Services
  const { createTag } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ form, setForm ] = useState({
    name: '',
  });

  // Create signpost
  const create = async (e) => {
    try {
      e.preventDefault();

      const result = await createTag(form.name, currentUser.token);
      if (result) history.push(Routes.TAGS);
    } catch (e) {
      console.log(e);
    };
  };

  return (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Tag maken
          </h1>
        </Col>
      </Row>
      <div className="create__form">
        <Row>
          <Col xs={12}>
            <form onSubmit={create}>
              <InputField 
                defaultValue=''
                placeholder='bv. #wiskunde'
                id='name'
                name='name'
                type='text'
                label='Titel'
                required={true}
                whenChanging={(e) => setForm({...form, [e.target.name]: e.target.value})}
              />
              <div className="create__form--submit d-flex justify-content-end">
                <button type="submit">
                  Maak tag
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  );
};

export default CreateTag;