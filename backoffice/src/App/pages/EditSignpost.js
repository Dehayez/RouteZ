import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ImageUpload, InputField, Textarea } from '../components';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useAuth, useApi } from '../services';

// Routes
import * as Routes from '../routes';

// CSS
import './_Create.scss';

const EditSignpost = () => {
  // Routing
  const history = useHistory();
  const { id } = useParams();

  // Services
  const { editSignPost, getSignPost } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ form, setForm ] = useState({
    title: '',
    shortedTitle: '',
    text: '',
    illustration: '',
    icon: '',
  });

  // Add illustration
  const setIllustration = (illustration) => {
    setForm({
      ...form,
      illustration: illustration,
    });
  };

  // Add icon
  const setIcon = (icon) => {
    setForm({
      ...form,
      icon: icon,
    });
  };

  // Edit signpost
  const edit = async (e) => {
    try {
      e.preventDefault();

      const result = await editSignPost(currentUser.token, form, id);

      if (result) history.push(Routes.SIGNPOSTS);
    } catch (e) {
      console.log(e);
    };
  };

  // Fetch signpost
  const fetchSignpost = useCallback(async () => {
    try {
      const result = await getSignPost(currentUser.token, id);

      if (result.error) {
        history.push(Routes.WHOOPSIE);
        return;
      };

      setForm({
        title: result.title,
        text: result.text,
        shortedTitle: result.shortedTitle,
        illustration: result.illustration,
        icon: result.icon,
      });
    } catch (e) {
      console.log(e);
    };
  }, [currentUser, id, getSignPost]);

  useEffect(() => {
    fetchSignpost();
  }, [fetchSignpost]);

  return form.title ? (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Wegwijzer "{form.title}" bewerken
          </h1>
        </Col>
      </Row>
      <div className="create__form">
        <Row>
          <Col xs={12}>
            <form onSubmit={edit}>
              <InputField 
                defaultValue={form.title}
                placeholder='bv. ... leren leren'
                id='title'
                name='title'
                type='text'
                label='Titel'
                required={true}
                whenChanging={(e) => setForm({...form, [e.target.name]: e.target.value})}
              />
              <InputField 
                defaultValue={form.shortedTitle}
                placeholder='bv. leren'
                id='shortedTitle'
                name='shortedTitle'
                type='text'
                label='Verkorte titel'
                required={true}
                whenChanging={(e) => setForm({...form, [e.target.name]: e.target.value})}
              />
              <Textarea 
                defaultValue={form.text}
                placeholder='bv. een korte introductie'
                id='text'
                name='text'
                label='Beschrijving'
                required={true}
                whenChanging={(e) => setForm({...form, [e.target.name]: e.target.value})}
              />
              <ImageUpload 
                title="Illustratie toevoegen"
                defaultImage={form.illustration}
                setImage={setIllustration}
              />
              <ImageUpload 
                title="Icoon toevoegen"
                defaultImage={form.icon}
                setImage={setIcon}
              />
              <div className="create__form--submit d-flex justify-content-end">
                <button type="submit">
                  Bewerk wegwijzer
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  ) : '';
};

export default EditSignpost;