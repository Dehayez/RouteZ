import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';

// Layouts
import { UsualLayout } from '../layouts';

// Component
import { Checkbox, InputField, UsualButton } from '../components';

// CSS
import 'react-quill/dist/quill.snow.css';

const CreateModule = () => {
  // States
  const [ paths, setPaths ] = useState([]);
  const [ typePath, setTypePath ] = useState();

  const CreateTheory = () => {
    // States
    const [ numberOfPages, setNumberOfPages ] = useState([{title: '', content: '', images: [], order: 1}]);

    return (
      <div className="create__form--paths--create--theory">
        {
          numberOfPages.length !== 1 && numberOfPages.map((page, index) => {
            return (
              <div className="create__form--paths--create--theory--item" key={index}>
                <h2>Pagina {index+1}</h2>
                <InputField 
                  type="text"
                  name="title"
                  placeholder="bv. Professioneel leren"
                  id="title"
                  defaultValue=""
                  required={true}
                  label="Titel"
                />
                <div className="create__form--wysiwyg">
                  <span className="wysiwyg-label">Inhoud</span>
                  <div className="wysiwyg-field">
                    <ReactQuill theme="snow" />
                  </div>
                </div>
                <div className="create__form--submit d-flex justify-content-end">
                  <UsualButton text="Pagina maken" />
                </div>
              </div>
            )
          })
        }
          <div className="create__form--paths--create--theory--item">
            <h2>Pagina {numberOfPages.length}</h2>
            <InputField 
              type="text"
              name="title"
              placeholder="bv. Professioneel leren"
              id="title"
              defaultValue=""
              required={true}
              label="Titel"
            />
            <div className="create__form--wysiwyg">
              <span className="wysiwyg-label">Inhoud</span>
              <div className="wysiwyg-field">
                <ReactQuill theme="snow" />
              </div>
            </div>
            <div className="create__form--submit d-flex justify-content-end">
              <UsualButton text="Pagina maken" />
          </div>
        </div>
      </div>
    );
  };

  const CreateExercises = () => {
    return '';
  };

  return (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Module maken
          </h1>
        </Col>
        <div className="create__form">
          <Col xs={12}>
            <InputField 
              type="text"
              name="title"
              placeholder="bv. Professioneel leren"
              id="title"
              defaultValue=""
              required={true}
              label="Titel"
            />
            <div className="create__form--wysiwyg">
              <span className="wysiwyg-label">Beschrijving</span>
              <div className="wysiwyg-field">
                <ReactQuill theme="snow" />
              </div>
            </div>
            <div className="create__form--paths">
              <h5>Paden</h5>
              <div className="create__form--paths__overview">
                {
                  paths && paths.length !== 0 ? paths.map((path, index) => {
                    return ''
                  }) : (
                    <span className="create__form--paths__overview--none">
                      Er zijn nog geen paden toegevoegd.
                    </span>
                  )
                }
              </div>
              <div className="create__form--paths--create">
                <h6>Pad toevoegen</h6>
                <div className="create__form--paths--create--check">
                  <Checkbox 
                    checked={typePath === 'Oefeningen' ? true : false}
                    id="Oefeningen"
                    label="Oefeningen"
                    setChecked={setTypePath}
                  />
                  <Checkbox 
                    checked={typePath === 'Theorie' ? true : false}
                    id="Theorie"
                    label="Theorie"
                    setChecked={setTypePath}
                  />
                  <Checkbox 
                    checked={typePath === 'Video' ? true : false}
                    id="Video"
                    label="Video"
                    setChecked={setTypePath}
                  />
                </div>
                {
                  typePath === 'Theorie' && <CreateTheory />
                }
                {
                  typePath === 'Oefeningen' && <CreateExercises />
                }
              </div>
            </div>
          </Col>
        </div>
      </Row>
    </UsualLayout>
  );
};

export default CreateModule;
