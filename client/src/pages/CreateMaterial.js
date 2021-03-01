import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Routes
import * as Routes from '../routes';

// Services
import { useApi, useAuth } from '../services';

// Formatting date
import { default as moment } from 'moment';
import 'moment/locale/nl-be';

// Components
import { Tags, RadioSelect, ButtonSmall } from '../components';

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
  const { getSignPosts, uploadDoc, createMaterial } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ signposts, setSignposts ] = useState();
  const [ file, setFile ] = useState();
  const [ loader, setLoader ] = useState(false);

  const [ selectedTags, setSelectedTags ] = useState();
  const [ selectedModule, setSelectedModule ] = useState();
  const [ selectedType, setSelectedType ] = useState();
  const [ selectedTarget, setSelectedTarget ] = useState();

  const [ form, setForm ] = useState({
    title: '',
    description: '',
    filename: '',
    file: '',
    size: '',
    videoUrl: '',
  });

  const [ error, setError ] = useState({
    visible: false,
    text: '',
  });

  // Init date
  let date = moment(Date.now());
  moment.locale('nl-be');

  const fetchData = useCallback(async () => {
    try {
      const signpostData = await getSignPosts(currentUser.token);
      setSignposts(signpostData);
    } catch (e) {
      history.push(Routes.NOT_FOUND);
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

  const updateTags = (array) => {
    setSelectedTags(array);
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

  const updateModule = (module) => {
    setSelectedModule(module);
    forceUpdate();
  };

  const updateTarget = (target) => {
    setSelectedTarget(target);
    forceUpdate();
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

  const updateMaterial = async (e) => {
    e.preventDefault();

    if (form.title.length === 0) {
      setError({
        visible: true,
        text: "Dit bestand heeft nog een titel nodig.",
      });
      return;
    };

    if (form.description.length === 0) {
      setError({
        visible: true,
        text: "Dit bestand heeft nog een beschrijving nodig.",
      });
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
      setError({
        visible: true,
        text: "Dit bestand heeft nog een tag nodig.",
      });
      return;
    };

    if (!selectedType) {
      setError({
        visible: true,
        text: "Dit bestand heeft nog een indeling nodig.",
      });
      return;
    };

    if (!selectedTarget) {
      setError({
        visible: true,
        text: "Dit bestand heeft nog een doelgroep nodig.",
      });
      return;
    };

    if (selectedType !== 'Video' && !file) {
      setError({
        visible: true,
        text: "Dit bestand moet nog upgeload worden.",
      });
      return;
    };

    if (selectedType === 'Video' && form.videoUrl.length === 0) {
      setError({
        visible: true,
        text: "De video-url moet nog toegevoegd worden.",
      });
      return;
    };

    let result;

    setLoader(true);

    if (form.type === 'Video') {
      result = await createMaterial({
        title: form.title,
        description: form.description,
        type: selectedType,
        target: selectedTarget,
        videoUrl: form.videoUrl,
        _authorId: currentUser.id,
        _moduleId: selectedModule,
      });
    } else {
      const uploaded = await uploadDoc(file);

      result = await createMaterial({
        title: form.title,
        description: form.description,
        type: selectedType,
        target: selectedTarget,
        filename: form.filename,
        file: uploaded.filename,
        size: form.size,
        _authorId: currentUser.id,
        _moduleId: selectedModule,
        _tagIds: selectedTags,
      });
    };

    history.push(Routes.MATERIAL.replace(':name', result._id));
  };

  return (
    <div className="create-material">
    {
      signposts && (
        <>
          <h1 className="create-material__title">Bestand uploaden</h1>
          <form  className="create-material-form" id="check-form">
			  <label className="create-material-form__label">Titel</label>
              <input className="create-material-form__input" onChange={(e) => changeInput(e)} placeholder="Titel" type="text" name="title" id="title" required />

			  <label className="create-material-form__label">Beschrijving</label>
              <textarea className="create-material-form__input" onChange={(e) => changeInput(e)} placeholder="Beschrijving" name="description" id="description" required />
          </form>

          <Tags  setForm={updateTags}/>

		  <label className="create-material__label">Bestand</label>
          <RadioSelect 
            text="Welk soort bestand wil je uploaden?"
            grouped={false}
            data={[
              {_id: "Document", title: "Document"},
              {_id: "Presentatie", title: "Presentatie"},
              {_id: "Video", title: "Video"},
            ]}
            setSelected={updateType}
          />

		  <label className="create-material__label">Doelgroep</label>
          <RadioSelect 
            text="Wat is jouw doelgroep?"
            grouped={false}
            data={[
              {_id: "De kiendjes", title: "De kiendjes"},
              {_id: "De vintjes", title: "De vintjes"},
              {_id: "De vrouwtjes", title: "De vrouwtjes"},
            ]}
            setSelected={updateTarget}
          />

 		  <label className="create-material__label">Toewijzing module</label>
          <RadioSelect 
            text="Aan welke module wil je deze toewijzen?"
            grouped={true}
            data={signposts}
            setSelected={updateModule}
          />

          {
              form && form.type === 'Video' ? (
                <input onChange={(e) => changeInput(e)} type="text" placeholder="video-url" name="videoUrl" id="videoUrl" />
              ) : (
                <>
                <input type="file" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*" onChange={(e) => uploadNewDocument(e)} name="file" id="file"/>
                {
                  file && (
                    <span>
                      <strong>{file.name}</strong>
                      <span>{date.format('L')} | {(file.size / (1024*1024)).toFixed(2)}MB</span>
                    </span>
                  )
                }
                </>
            )
          }
          {
            error.visible && (
              error.text
            )
          }
		  <div className="create-material-buttons">
			<ButtonSmall content="Annuleren" color="secondary" onClick={() => history.push(Routes.MY_MATERIALS)}/>
			<ButtonSmall content="Opslaan" color="primary" onClick={(e) => updateMaterial(e)} type="submit"/>
		  </div>
        </>
      )
    }
    </div>
  );
};

export default CreateMaterial;
