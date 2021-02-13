import React, { useCallback, useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

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

const EditMaterial = () => {
  const forceUpdate = useForceUpdate();

  // Routing
  const history = useHistory();
  const { id } = useParams();

  // Services
  const { getSignPosts, editMaterial, getMaterial, uploadDoc } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ form, setForm ] = useState({
    title: '',
    description: '',
    _moduleId: '',
    type: '',
    filename: '',
    file: '',
    size: '',
    videoUrl: '',
    target: '',
    _tagIds: [],
  });

  const [ material, setMaterial ] = useState();
  const [ signposts, setSignposts ] = useState();
  const [ newFile, setNewFile ] = useState();

  const [ selectedTags, setSelectedTags ] = useState();
  const [ selectedModule, setSelectedModule ] = useState();
  const [ selectedType, setSelectedType ] = useState();
  const [ selectedTarget, setSelectedTarget ] = useState();

  const [ error, setError ] = useState(false);

  // Init date
  let created = moment(material && material._createdAt);
  let newCreated = moment(Date.now());
  moment.locale('nl-be');

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

  const fetchMaterial = useCallback(async () => {
    try {
      if (!id) {
        history.push(Routes.WHOOPSIE);
        return;
      };

      const data = await getMaterial(id, currentUser.token);
      const signpostsData = await getSignPosts(currentUser.token);

      setMaterial(data);
      setForm({
        title: data.title,
        description: data.description,
        _moduleId: data._moduleId,
        type: data.type,
        filename: data.filename,
        file: data.file,
        size: data.size,
        videoUrl: data.videoUrl,
        target: data.target,
        _tagIds: data._tagIds,
      });
      setSelectedTags(data.tags ? data.tags : '');
      setSelectedTarget(data.target);
      setSignposts(signpostsData);
    } catch (e) {
      history.push(Routes.WHOOPSIE);
    };
  }, [id, history, getMaterial, getSignPosts, currentUser]);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

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
      size: `${(upload.size / (1024*1024)).toFixed(2)}MB`,
      file: null,
    });
    setNewFile(e.target.files[0]);
  };

  const updateMaterial = async () => {
    let result;
    let tags;

    if (selectedTags) {
      let array = [];

      for (let i = 0; i < selectedTags.length; i++) {
        array.push(selectedTags._id);
      };

      tags = array;
    } else {
      tags = form._tagIds;
    };

    if (selectedType === 'Video') {
      result = await editMaterial(material._id, {
        title: form.title,
        description: form.description,
        _moduleId: selectedModule ? selectedModule : form._moduleId,
        type: selectedType ? selectedType : form.type,
        videoUrl: form.videoUrl,
        target: selectedTarget,
        _tagIds: tags,
      });
    } else {
      if (form.file === null) {
        const uploaded = await uploadDoc(newFile);
        result = await editMaterial(material._id, {
          title: form.title,
          description: form.description,
          _moduleId: selectedModule ? selectedModule : form._moduleId,
          type: selectedType ? selectedType : form.type,
          filename: uploaded.filename,
          file: form.file,
          size: form.size,
          target: selectedTarget,
          _tagIds: tags,
        });
      } else {
        result = await editMaterial(material._id, {
          title: form.title,
          description: form.description,
          _moduleId: selectedModule ? selectedModule : form._moduleId,
          type: selectedType ? selectedType : form.type,
          filename: form.file,
          file: form.file,
          size: form.size,
          target: selectedTarget,
          _tagIds: tags,
        });
      };
    };

    if (result) history.push(Routes.MATERIALS);
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
                defaultValue={form.title}
                required={true}
                label="Titel"
                whenChanging={(e) => changeInput(e)}
              />
              <Textarea 
                name="description"
                placeholder="bv. Dis een document die jou zal helpen."
                id="description"
                defaultValue={form.description}
                required={true}
                label="Beschrijving"
                whenChanging={(e) => changeInput(e)}
              />
              <Tags 
                setForm={updateTags}
                defaultTags={material.tags}
              />
              <RadioSelect 
                text="Welk soort bestand wil je uploaden"
                grouped={false}
                data={[
                  {_id: "Document", title: "Document"},
                  {_id: "Presentatie", title: "Presentatie"},
                  {_id: "Video", title: "Video"},
                ]}
                defaultSelected={material.type}
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
                defaultSelected={material.target}
                setSelected={updateTarget}
              />
              <RadioSelect 
                text="Aan welke module wil je deze toewijzen"
                grouped={true}
                data={signposts}
                setSelected={updateModule}
                defaultSelected={material._moduleId}
              />
              {
                form && form.type === 'Video' ? (
                  <InputField 
                    type="text"
                    name="videoUrl"
                    placeholder="bv. www.youtube.com/dhe455holq"
                    id="videoUrl"
                    defaultValue={form.videoUrl}
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
                      form && (
                        <div className="create__form--file--info">
                          <strong>{form.filename}</strong><br/>
                          <span>{form.file ? created.format('L') : newCreated.format('L')} | {form.size}</span>
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
              <UsualButton text="Bewerk materiaal" action={updateMaterial} />
            </div>
          </Col>
        </Row>
      </div>
    </UsualLayout>
  ) : '';
};

export default EditMaterial;
