import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

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
  const { id } = useParams();

  // Services
  const { editTag, getTag } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ form, setForm ] = useState({
    name: '',
  });
  const [ tag, setTag ] = useState();

  // Edit tag
  const edit = async (e) => {
    try {
      e.preventDefault();

      const result = await editTag(form.name, currentUser.token, id);
      if (result) history.push(Routes.TAGS);
    } catch (e) {
      console.log(e);
    };
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await getTag(id, currentUser.token);
      setTag(data);
      setForm({...form, name: data.name});
    } catch (e) {
      console.log(e);
    };
  }, [currentUser, id, getTag]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return tag ? (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Tag bewerken
          </h1>
        </Col>
      </Row>
      <div className="create__form">
        <Row>
          <Col xs={12}>
            <form onSubmit={edit}>
              <InputField 
                defaultValue={tag.name}
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
                  Bewerk tag
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  ) : '';
};

export default CreateTag;