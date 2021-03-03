import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { useHistory } from 'react-router-dom';

// Layouts
import { UsualLayout } from '../layouts';

// Component
import { Checkbox, DeleteButton, InputField, Message, UsualButton } from '../components';

// Config
import * as Config from '../config';

// Services
import { useApi, useAuth } from '../services';

// Routes
import * as Routes from '../routes';

// CSS
import 'react-quill/dist/quill.snow.css';

const CreateModule = () => {
  // Routing
  const history = useHistory();

  // States
  const [ paths, setPaths ] = useState([]);
  const [ typePath, setTypePath ] = useState();
  const [ moduleForm, setModuleForm ] = useState({
    title: '',
    content: '',
  });
  const [ error, setError ] = useState(false);

  // Services
  const { uploadFile, createNotification, createExercise, createModule, createPath, addExerciseToPath, addPathToModule } = useApi();
  const { currentUser } = useAuth();

  // Delete path
  const deletePath = (index) => {
    let array = [];

    for (let i = 0; i < paths.length; i++) {
      array.push(paths[i]);
    };

    array.splice(index, 1);

    setPaths(array);
  };

    // Create module
  const addModule = async () => {
    // Create module
    const moduleResult = await createModule(currentUser.token, {
      title: moduleForm.title,
      content: moduleForm.content,
    });

    await createNotification(currentUser.token, {
      text: `Er is een nieuwe module aangemaakt genaamd "${moduleResult.title}"`,
      type: 'module',
      _moduleId: moduleResult._id,
    });

    if (!moduleResult) {
      setError(true);
      return;
    };

    // Create paths
    for (let i = 0; i < paths.length; i++) {
      const pathResult = await createPath(currentUser.token, paths[i]);

      if (!pathResult) {
        setError(true);
        return;
      };

      if (paths[i].type === "Oefeningen") {
        for (let j = 0; j < paths[i]._exerciseIds.length; j++) {
          const addedResult = await addExerciseToPath(currentUser.token, pathResult._id, paths[i]._exerciseIds[j]);

          if (!addedResult) {
            setError(true);
            return;
          };
        }
      }

      const addedResult = await addPathToModule(currentUser.token, pathResult._id, moduleResult._id);

      if (!addedResult) {
        setError(true);
        return;
      }
    };

    history.push(Routes.MODULES);
  };

  const CreateTheory = () => {
    // States
    const [ numberOfPages, setNumberOfPages ] = useState([{title: '', content: '', images: [], order: 1}]);
    const [ mainTitle, setMainTitle ] = useState();

    // On change
    const changeTitle = (e, index) => {
      let array = [];

      for (let i = 0; i < numberOfPages.length; i++) {
        if (i === index) {
          const object = {title: e.target.value, content: numberOfPages[i].content, images: numberOfPages[i].images, order: numberOfPages[i].order};
          array.push(object);
        } else {
          array.push(numberOfPages[i]);
        }
      };

      setNumberOfPages(array);
    };

    const changeContent = (e, index) => {
      let array = [];

      for (let i = 0; i < numberOfPages.length; i++) {
        if (i === index) {
          const object = {title: numberOfPages[i].title, content: e, images: numberOfPages[i].images, order: numberOfPages[i].order};
          array.push(object);
        } else {
          array.push(numberOfPages[i]);
        }
      };

      setNumberOfPages(array);
    };

    // Upload image and push
    const uploadImage = async (e, index) => {
      const result = await uploadFile(e.target.files[0], currentUser.token);

      let array = [];

      for (let i = 0; i < numberOfPages.length; i++) {
        if (i === index) {
          let arrayOfImages = [];

          for (let j = 0; j < numberOfPages[i].images.length; j++) {
            arrayOfImages.push(numberOfPages[i].images[j]);
          };

          arrayOfImages.push(result.filename);

          const object = {title: numberOfPages[i].title, content: numberOfPages[i].content, order: numberOfPages[i].order, images: arrayOfImages};
          array.push(object);
        } else {
          array.push(numberOfPages[i]);
        };
      };

      setNumberOfPages(array);
    };

    // Add pages
    const addPage = () => {
      let array = [];

      for (let i = 0; i < numberOfPages.length; i++) {
        array.push(numberOfPages[i]);
      };

      array.push({title: '', content: '', images: [], order: numberOfPages.length+1});

      setNumberOfPages(array);
    };

    // Add to module 
    const addToModules = () => {
      let array = [];

      for (let i = 0; i < paths.length; i++) {
        array.push(paths[i]);
      };

      array.push({
        type: 'Theorie',
        title: mainTitle,
        theoryText: numberOfPages,
      });

      setPaths(array);

      setNumberOfPages([{title: '', content: '', images: [], order: 1}]);
      setMainTitle('');
      setTypePath('');
    };

    return (
      <div className="create__form--paths--create--theory">
        <div className="create__form--paths--create--theory--title">
          <InputField 
            type="text"
            name="mainTitle"
            placeholder="bv. Grotendeels veel tekst"
            id="mainTitle"
            defaultValue={mainTitle}
            required={true}
            label="Hoofdtitel"
            whenChanging={(e) => setMainTitle(e.target.value)}
          />
        </div>
        {
          numberOfPages.map((page, index) => {
            return (
              <div className="create__form--paths--create--theory--item" key={index}>
                <h2>Pagina {index+1}</h2>
                <InputField 
                  type="text"
                  name="title"
                  placeholder="bv. Professioneel leren"
                  id="title"
                  defaultValue={page.title}
                  required={true}
                  label="Titel"
                  whenChanging={(e) => changeTitle(e, index)}
                />
                <div className="create__form--wysiwyg">
                  <span className="wysiwyg-label">Inhoud</span>
                  <div className="wysiwyg-field">
                    <ReactQuill onChange={(e) => changeContent(e, index)} theme="snow" defaultValue={page.content} />
                  </div>
                </div>
                <div className="create__form--images">
                  <span className="images-label">Afbeeldingen</span>
                  <div className="images-field d-flex">
                    {
                      page.images.map((image, innerIndex) => {
                        return (
                          <div key={innerIndex} className="create__form--images--item" style={{
                            backgroundImage: `url("${Config.apiConfig.baseURL}file/${image}")`
                          }}>
                          </div>
                        )
                      })
                    }
                    <div className="create__form--images--add">
                      <span>+</span>
                      <input type="file" onChange={(e) => uploadImage(e, index)} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
          <div className="create__form--paths--create--theory--item">
            <div className="create__form--submit d-flex justify-content-end">
              <UsualButton text="Pad maken" action={addToModules} />
              <UsualButton text="Extra pagina maken" action={addPage} />
          </div>
        </div>
      </div>
    );
  };

  const CreateExercises = () => {
    // States
    const [ numberOfExercises, setNumberOfExercises ] = useState([{question: '', multiple: false, open: false, answers: [{text: '', correct: false}]}]);
    const [ mainTitle, setMainTitle ] = useState();

    // On change
    const changeQuestion = (e, index) => {
      let array = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        if (i === index) {
          const object = {question: e.target.value, multiple: numberOfExercises[i].multiple, open: numberOfExercises[i].open, answers: numberOfExercises[i].answers};
          array.push(object);
        } else {
          array.push(numberOfExercises[i]);
        }
      };

      setNumberOfExercises(array);
    };

    // Change answer
    const changeAnswer = (index, innerIndex, e) => {
      let array = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        if (i === index) {
          let innerArray = [];

          for (let j = 0; j < numberOfExercises[i].answers.length; j++) {
            innerArray.push(numberOfExercises[i].answers[j]);
          };

          innerArray[innerIndex].text = e.target.value;

          const object = {question: numberOfExercises[i].question, multiple: numberOfExercises[i].multiple, open: numberOfExercises[i].open, answers: innerArray};
          array.push(object);
        } else {
          array.push(numberOfExercises[i]);
        };
      };

      setNumberOfExercises(array);
    };

    // Change correct
    const changeCorrect = (index, innerIndex, value) => {
      let array = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        if (i === index) {
          let innerArray = [];

          for (let j = 0; j < numberOfExercises[i].answers.length; j++) {
            innerArray.push(numberOfExercises[i].answers[j]);
          };

          innerArray[innerIndex].correct = value;

          const object = {question: numberOfExercises[i].question, multiple: numberOfExercises[i].multiple, open: numberOfExercises[i].open, answers: innerArray};
          array.push(object);
        } else {
          array.push(numberOfExercises[i]);
        };
      };

      setNumberOfExercises(array);
    };

    // Create new answer
    const createAnswer = (index) => {
      let array = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        if (i === index) {
          let innerArray = [];

          for (let j = 0; j < numberOfExercises[i].answers.length; j++) {
            innerArray.push(numberOfExercises[i].answers[j]);
          };

          innerArray.push({text: '', correct: false});

          const object = {question: numberOfExercises[i].question, multiple: numberOfExercises[i].multiple, open: numberOfExercises[i].open, answers: innerArray};
          array.push(object);
        } else {
          array.push(numberOfExercises[i]);
        };
      };

      setNumberOfExercises(array);
    };

    // Delete answer
    const deleteAnswer = (index, innerIndex) => {
      let array = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        if (i === index) {
          let innerArray = [];

          for (let j = 0; j < numberOfExercises[i].answers.length; j++) {
            innerArray.push(numberOfExercises[i].answers[j]);
          };

          innerArray.splice(innerIndex, 1);

          const object = {question: numberOfExercises[i].question, multiple: numberOfExercises[i].multiple, open: numberOfExercises[i].open, answers: innerArray};
          array.push(object);
        } else {
          array.push(numberOfExercises[i]);
        };
      };

      setNumberOfExercises(array);
    };

    const setTypeQuestion = (id, index) => {
      let array = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        if (i === index) {
          let object;

          switch (String(id)) {
            case "multiple":
              object = {question: numberOfExercises[i].question, multiple: true, open: false, answers: numberOfExercises[i].answers};
              break;
            case "open":
              object = {question: numberOfExercises[i].question, multiple: false, open: true, answers: numberOfExercises[i].answers};
              break;
            case "normal":
              object = {question: numberOfExercises[i].question, multiple: false, open: false, answers: numberOfExercises[i].answers};
              break;
            default:
              break;
          }
          array.push(object);
        } else {
          array.push(numberOfExercises[i]);
        }
      };

      setNumberOfExercises(array);
    };

    // Create new question
    const createQuestion = () => {
      let array = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        array.push(numberOfExercises[i]);
      };

      array.push({question: '', multiple: false, open: false, answers: [{text: '', correct: false}]});

      setNumberOfExercises(array);
    };

    // Add to module 
    const addToModules = async () => {
      let array = [];

      for (let i = 0; i < paths.length; i++) {
        array.push(paths[i]);
      };

      // Upload exercises to db
      let arrayOfExerciseIds = [];

      for (let i = 0; i < numberOfExercises.length; i++) {
        const result = await createExercise(currentUser.token, numberOfExercises[i]);
        arrayOfExerciseIds.push(result._id);
      };

      array.push({
        type: 'Oefeningen',
        title: mainTitle,
        _exerciseIds: arrayOfExerciseIds,
      });

      setPaths(array);

      setNumberOfExercises({question: '', multiple: false, open: false, answers: [{text: '', correct: false}]});
      setMainTitle('');
      setTypePath('');
    };

    return (
      <div className="create__form--paths--create--exercises">
        <div className="create__form--paths--create--exercises--title">
          <InputField 
            type="text"
            name="mainTitle"
            placeholder="bv. Grotendeels veel tekst"
            id="mainTitle"
            defaultValue={mainTitle}
            required={true}
            label="Hoofdtitel"
            whenChanging={(e) => setMainTitle(e.target.value)}
          />
        </div>
        {
          numberOfExercises.map((question, index) => {
            return (
              <div className="create__form--paths--create--exercises--item" key={index}>
                <h2>Vraag {index+1}</h2>
                <div className="create__form--paths--create--exercises--item__check">
                  <Checkbox 
                    checked={question.multiple === true ? true : false}
                    id="multiple"
                    label="Meerkeuze"
                    setChecked={() => setTypeQuestion("multiple", index)}
                  />
                  <Checkbox 
                    checked={question.multiple === false ? question.open ? false : true : false}
                    id="normal"
                    label="Eén antwoord"
                    setChecked={() => setTypeQuestion("normal", index)}
                  />
                  <Checkbox 
                    checked={question.open === true ? true : false}
                    id="open"
                    label="Open vraag"
                    setChecked={() => setTypeQuestion("open", index)}
                  />
                </div>
                <InputField 
                  type="text"
                  name="question"
                  placeholder="bv. Is dit correct? Zoja, kies het juiste antwoord"
                  id="question"
                  defaultValue={question.question}
                  required={true}
                  label="Vraagstelling"
                  whenChanging={(e) => changeQuestion(e, index)}
                />
                {
                  question.open === false && (
                    <div className="create__form--paths--create--exercises--item__questions">
                      {
                        question.answers.map((answer, innerIndex) => {
                          return (
                            <div key={innerIndex}>
                              <div className="create__form--paths--create--exercises--item__questions--answer">
                                <InputField 
                                  type="text"
                                  name={`answer_${index}_${innerIndex}`}
                                  placeholder="bv. Dit is een leuk antwoord!"
                                  id={`answer_${index}_${innerIndex}`}
                                  defaultValue={answer.text}
                                  required={true}
                                  label={`Antwoord ${innerIndex+1}`}
                                  whenChanging={(e) => changeAnswer(index, innerIndex, e)}
                                />
                                <Checkbox 
                                  checked={answer.correct === true ? true : false}
                                  id={`correct_${index}_${innerIndex}`}
                                  label="Correct"
                                  setChecked={() => changeCorrect(index, innerIndex, answer.correct === true ? false : true)}
                                />
                                <div className="d-flex justify-content-end">
                                  <UsualButton text="Extra antwoord" action={() => createAnswer(index)} />
                                  <DeleteButton text="Verwijder antwoord" action={() => deleteAnswer(index, innerIndex)} />
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
                <div className="create__form--paths--create--exercises--item--more d-flex justify-content-end">
                  <UsualButton text="Pad maken" action={addToModules} />
                  <UsualButton text="Extra vraag" action={createQuestion}/>
                </div>
              </div>
            )
          })
        }
      </div>
    );
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
              whenChanging={(e) => setModuleForm({...moduleForm, title: e.target.value})}
            />
            <div className="create__form--wysiwyg">
              <span className="wysiwyg-label">Beschrijving</span>
              <div className="wysiwyg-field">
                <ReactQuill theme="snow" onChange={(e) => setModuleForm({...moduleForm, content: e})} />
              </div>
            </div>
            <div className="create__form--paths">
              <h5>Paden</h5>
              <div className="create__form--paths__overview">
                {
                  paths && paths.length !== 0 ? paths.map((path, index) => {
                    return (
                      <div key={index} className="create__form--paths__overview--item d-flex justify-content-between align-items-center">
                        <div className="create__form--paths__overview--item--text">
                          <h5>{path.title}</h5>
                          <span>{path.type}</span>
                        </div>
                        <div className="d-flex">
                          <DeleteButton text="Verwijderen" action={() => deletePath(index)} />
                        </div>
                      </div>
                    )
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
                </div>
                {
                  typePath === 'Theorie' && <CreateTheory />
                }
                {
                  typePath === 'Oefeningen' && <CreateExercises />
                }
              </div>
              {
                error && <Message text="Deze module kon niet worden gemaakt" />
              }
              <div className="create__form--submit d-flex justify-content-end">
                <UsualButton text="Maak module" action={addModule} />
              </div>
            </div>
          </Col>
        </div>
      </Row>
    </UsualLayout>
  );
};

export default CreateModule;
