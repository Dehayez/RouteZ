import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Components
import { ImageUpload, InputField, MultipleRadioSelect, Textarea } from '../components';

// Layouts
import { UsualLayout } from '../layouts';

// Services
import { useAuth, useApi } from '../services';

// Routes
import * as Routes from '../routes';

// CSS
import './_Create.scss';

const CreateSignpost = () => {
  // Routing
  const history = useHistory();

  // Services
  const { createSignPost, getModules } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ form, setForm ] = useState({
    title: '',
    shortedTitle: '',
    text: '',
    illustration: '',
    icon: '',
    _moduleIds: [],
  });

  const [ allModules, setAllModules ] = useState();

  // Change modules
  const setSelectedModules = (id) => {
    let array = [];
    console.log(id)

    for (let i = 0; i < form._moduleIds.length; i++) {
      array.push(form._moduleIds[i]);
    };

    if (array.includes(id)) {
      array.splice(array.indexOf(id), 1);
    } else {
      array.push(id);
    };

    console.log(array)

    setForm({
      ...form,
      _moduleIds: array,
    });
  };

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

  // Create signpost
  const create = async (e) => {
    try {
      e.preventDefault();

      const result = await createSignPost(currentUser.token, form);

      if (result) history.push(Routes.SIGNPOSTS);
    } catch (e) {
      console.log(e);
    };
  };

  // Fetch modules
  const fetchModules = useCallback(async () => {
    try {
      const modulesResult = await getModules(currentUser.token);
      setAllModules(modulesResult);
    } catch (e) {
      console.log(e);
    };
  }, [currentUser, getModules]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return allModules ? (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Wegwijzer maken
          </h1>
        </Col>
      </Row>
      <div className="create__form">
        <Row>
          <Col xs={12}>
            <form onSubmit={create}>
              <InputField 
                defaultValue=''
                placeholder='bv. ... leren leren'
                id='title'
                name='title'
                type='text'
                label='Titel'
                required={true}
                whenChanging={(e) => setForm({...form, [e.target.name]: e.target.value})}
              />
              <InputField 
                defaultValue=''
                placeholder='bv. leren'
                id='shortedTitle'
                name='shortedTitle'
                type='text'
                label='Verkorte titel'
                required={true}
                whenChanging={(e) => setForm({...form, [e.target.name]: e.target.value})}
              />
              <Textarea 
                defaultValue=''
                placeholder='bv. een korte introductie'
                id='text'
                name='text'
                label='Beschrijving'
                required={true}
                whenChanging={(e) => setForm({...form, [e.target.name]: e.target.value})}
              />
              <MultipleRadioSelect 
                text="Voeg modules toe aan deze wegwijzer"
                data={allModules}
                defaultSelected={form._moduleIds}
                setSelected={setSelectedModules}
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
                  Maak wegwijzer
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  ) : '';
};

export default CreateSignpost;