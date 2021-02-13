import React, { useCallback, useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Components
import { InputField, Textarea, Tags, RadioSelect, UsualButton, Message } from '../components';

// Formatting date
import { default as moment } from 'moment';
import 'moment/locale/nl-be';

// Services
import { useApi, useAuth } from '../services';

// Routes
import * as Routes from '../routes';

// CSS
import './_Create.scss';

// Small function to force a re-render
const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

const CreateMaterial = () => {
  const forceUpdate = useForceUpdate();

  // Routing
  const history = useHistory();

  // Services
  const { getSignPosts, createMaterial, uploadDoc } = useApi();
  const { currentUser } = useAuth();

  // Init date
  let date = moment(Date.now());
  moment.locale('nl-be');

  // States
  const [ form, setForm ] = useState({
    title: '',
    description: '',
    filename: '',
    file: '',
    size: '',
    videoUrl: '',
  });

  const [ signposts, setSignposts ] = useState();
  const [ file, setFile ] = useState();

  const [ selectedTags, setSelectedTags ] = useState();
  const [ selectedTarget, setSelectedTarget ] = useState();
  const [ selectedModule, setSelectedModule ] = useState();
  const [ selectedType, setSelectedType ] = useState();

  console.log(selectedTags)

  const [ error, setError ] = useState(false);

  const updateTags = (array) => {
    setSelectedTags(array);
    forceUpdate();
  };

  const updateTarget = (target) => {
    setSelectedTarget(target);
    forceUpdate();
  };

  const updateModule = (module) => {
    setSelectedModule(module);
    forceUpdate();
  };

  const updateType = (type) => {
    setSelectedType(type);
    setForm({
      ...form,
      type: type,
    })
    forceUpdate();
  };

  const fetchData = useCallback(async () => {
    try {
      const signpostData = await getSignPosts(currentUser.token);
      setSignposts(signpostData);
    } catch (e) {
      history.push(Routes.WHOOPSIE);
    };
  }, [history, currentUser, getSignPosts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const changeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const uploadNewDocument = async (e) => {
    e.preventDefault();
    const upload = e.target.files[0];
    setForm({
      ...form,
      filename: upload.name,
      size: `${(upload.size / (1024*1024)).toFixed(2)}MB`
    });
    setFile(upload);
  };

  const updateMaterial = async () => {
    if (form.title.length === 0) {
      setError(true);
      return;
    };

    if (form.description.length === 0) {
      setError(true);
      return;
    };

    if (!selectedModule) {
      setError({
        visible: true,
        text: "Dit bestand heeft nog een module nodig.",
      });
      return;
    };

    if (!selectedTags) {
      setError(true);
      return;
    };

    if (!selectedType) {
      setError(true);
      return;
    };

    if (!selectedTarget) {
      setError(true);
      return;
    };

    if (selectedType !== 'Video' && !file) {
      setError(true);
      return;
    };

    if (selectedType === 'Video' && form.videoUrl.length === 0) {
      setError(true);
      return;
    };

    let result;

    if (form.type === 'Video') {
      result = await createMaterial(currentUser.token, {
        title: form.title,
        description: form.description,
        type: selectedType,
        target: selectedTarget,
        videoUrl: form.videoUrl,
        _authorId: currentUser.id,
        _moduleId: selectedModule,
      });
    } else {
      const uploaded = await uploadDoc(currentUser.token, file);

      result = await createMaterial(currentUser.token, {
        title: form.title,
        description: form.description,
        type: selectedType,
        target: selectedTarget,
        filename: form.filename,
        file: uploaded.filename,
        size: form.size,
        _authorId: currentUser.id,
        _moduleId: selectedModule,
      });
    };

    console.log(result);

    history.push(Routes.MATERIALS);
  };

  return signposts ? (
    <UsualLayout>
      <Row>
        <Col xs={12}>
          <h1 className="create__title">
            Materiaal maken
          </h1>
        </Col>
      </Row>
      <div className="create__form">
        <Row>
          <Col xs={12}>
              <InputField 
                type="text"
                name="title"
                placeholder="bv. Hoe leren?"
                id="title"
                defaultValue=""
                required={true}
                label="Titel"
                whenChanging={(e) => changeInput(e)}
              />
              <Textarea 
                name="description"
                placeholder="bv. Dis een document die jou zal helpen."
                id="description"
                defaultValue=""
                required={true}
                label="Beschrijving"
                whenChanging={(e) => changeInput(e)}
              />
              <Tags 
                setForm={updateTags}
              />
              <RadioSelect 
                text="Welk soort bestand wil je uploaden"
                grouped={false}
                data={[
                  {_id: "Document", title: "Document"},
                  {_id: "Presentatie", title: "Presentatie"},
                  {_id: "Video", title: "Video"},
                ]}
                setSelected={updateType}
              />
              <RadioSelect 
                text="Welke doelgroep"
                grouped={false}
                data={[
                  {_id: "De kiendjes", title: "De kiendjes"},
                  {_id: "De vintjes", title: "De vintjes"},
                  {_id: "De vrouwtjes", title: "De vrouwtjes"},
                ]}
                setSelected={updateTarget}
              />
              <RadioSelect 
                text="Aan welke module wil je deze toewijzen"
                grouped={true}
                data={signposts}
                setSelected={updateModule}
              />
              {
                form && form.type === 'Video' ? (
                  <InputField 
                    type="text"
                    name="videoUrl"
                    placeholder="bv. www.youtube.com/dhe455holq"
                    id="videoUrl"
                    defaultValue=""
                    required={true}
                    label="Video-url"
                    whenChanging={(e) => changeInput(e)}
                  />
                ) : (
                  <div className="create__form--file">
                    <div className="create__form--file--wrapper">
                      <span>
                        Bestand uploaden
                      </span>
                      <input type="file" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*" onChange={(e) => uploadNewDocument(e)} name="file" id="file"/>
                    </div>
                    {
                      file && (
                        <div className="create__form--file--info">
                          <strong>{file.name}</strong><br/>
                          <span>{date.format('L')} | {(file.size / (1024*1024)).toFixed(2)}MB</span>
                        </div>
                      )
                    }
                  </div>
              )
            }
            {
              error && (
                <Message text="Het materiaal kon niet worden upgeload" />
              )
            }
              <div className="create__form--submit d-flex justify-content-end">
                <UsualButton text="Maak materiaal" action={updateMaterial} />
              </div>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  ) : '';
};

export default CreateMaterial;
