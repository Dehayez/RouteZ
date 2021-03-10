import React, { useEffect, useLayoutEffect, useState } from 'react';

// Services
import { useAuth } from '../../services';

// Componentes
import { ButtonSmall } from '../../components';

import './Paths.scss';

const Exercises = ({exercises, previousResults}) => {

  // Services
  const { editProgress, currentUser } = useAuth();
  const [ showPrevious, setShowPrevious ] = useState(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      if(showPrevious) {
        if (previousResults && previousResults.length !== 0) {
          for (let i = 0; i < previousResults.length; i++) {
            if (previousResults[i].answers[0].response) {
              document.getElementById(previousResults[i].questionId).value = previousResults[i].answers[0].response;
            };
  
            for (let j = 0; j < exercises.length; j++) {
              if (previousResults[i].questionId === exercises[j]._id) {
                for (let k = 0; k < previousResults[i].answers.length; k++) {
                  for (let l = 0; l < exercises[j].answers.length; l++) {
                    if(previousResults[i].answers[k].answerId === exercises[j].answers[l]._id) {
                      if (previousResults[i].answers[k].correct === exercises[j].answers[l].correct) {
                        console.log(previousResults[i].answers[k].answerId)
                        document.getElementById(previousResults[i].answers[k].answerId).className = 'correct-answer';
                      } else {
                        document.getElementById(previousResults[i].answers[k].answerId).className = 'wrong-answer';
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, 500);
  }, [previousResults, exercises]);

  const Question = ({element, index}) => {
    return element.multiple ? (
      <fieldset name={`question${index}`} className="exercise-fieldset">
        <legend className="exercise__question">
          {element.question}
        </legend>
        {
          element.answers.map((innerElement, innerIndex) => {
            return <label className="exercise-fieldset-label" key={innerIndex}> {innerElement.text}
						<input className="checkbox" type="checkbox" id={innerElement._id} value={innerElement.text} name={`question${index}`} />
						<span className="checkmark"></span>
					</label>
          })
        }
      </fieldset>
    ) : (
      <fieldset name={`question${index}`} className="exercise-fieldset">
        <legend className="exercise__question">
          {element.question}
        </legend>
        {
          element.answers.map((innerElement, innerIndex) => {
            return <label className="exercise-fieldset-label" key={innerIndex}> {innerElement.text}
						<input className="checkbox" type="radio" id={innerElement._id} /* className="exercise__radio" */ value={innerElement.text} name={`question${index}`} />
						<span className="checkmark checkmark-radio"></span>
					</label>
          })
        }
      </fieldset>
    )
  };

  const OpenQuestion = ({element, index}) => {
    return (
      <div className="exercise-fieldset">
        <label htmlFor={element._id} className="exercise__question">
          {element.question}
        </label>
        <textarea name={element._id} id={element._id} className="exercise__textarea" />
      </div>
    )
  };

  const submitExercise = async (e) => {
    e.preventDefault();

    let questionIndex = 0;
    let answerIndex = 0;
    let arrayOfAnswers = [];

    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].localName === 'textarea') {
        let object = {questionId: e.target[i].id, answers: []};
        object.answers.push({response: e.target[i].value});
        arrayOfAnswers.push(object);
      };

      if (e.target[i].localName === 'fieldset') {
        questionIndex = questionIndex + 1;

        // console.log('Vraag', questionIndex-1);
        let object = {questionId: exercises[questionIndex-1]._id, answers: []};
        answerIndex = 0;
        for (let j = 0; j < e.target[i].children.length; j++) {
          if (j > 0) {
            answerIndex = answerIndex + 1;
            const result = e.target[i].children[j].children[0].checked;
            const id = e.target[i].children[j].children[0].id;

            // Check if they put it as correct
            if (result === true) {
              // Check if it's also correct
              if (result === exercises[questionIndex-1].answers[answerIndex-1].correct) {
                object.answers.push({answerId: exercises[questionIndex-1].answers[answerIndex-1]._id, text: exercises[questionIndex-1].answers[answerIndex-1].text, correct: result});                // console.log('Antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is juist');
                document.getElementById(id).className = 'correct-answer';
              } else {
                object.answers.push({answerId: exercises[questionIndex-1].answers[answerIndex-1]._id, text: exercises[questionIndex-1].answers[answerIndex-1].text, correct: result});                // console.log('Antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is onjuist');
                document.getElementById(id).className = 'wrong-answer';
              };
            };

            // Check if they put it as incorrect
            if (result === false) {
              // Check if it's also incorrect
              if (result === exercises[questionIndex-1].answers[answerIndex-1].correct) {
                object.answers.push({answerId: exercises[questionIndex-1].answers[answerIndex-1]._id, text: exercises[questionIndex-1].answers[answerIndex-1].text, correct: result});
                document.getElementById(id).className = 'wrong-answer';
                // console.log('Geen antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is juist');
              } else {
                object.answers.push({answerId: exercises[questionIndex-1].answers[answerIndex-1]._id, text: exercises[questionIndex-1].answers[answerIndex-1].text, correct: result});                // console.log('Geen antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is onjuist');
                document.getElementById(id).className = 'correct-answer';
              };
            };
          };
        };

        arrayOfAnswers.push(object);
      };
    };

    await editProgress(currentUser.token, {exercise: arrayOfAnswers});
  };

  const redoExercise = () => {
    setShowPrevious(false);

    for (let i = 0; i < exercises.length; i++) {
      for (let j = 0; j < exercises[i].answers.length; j++) {
        document.getElementById(exercises[i].answers[j]._id).className = '';
      };
    };
  };

	return (
		<form className="exercise" onSubmit={(e) => submitExercise(e)}>
			{
				exercises.map((element, index) => {
				return !element.open ? <Question key={index} index={index} element={element} /> : <OpenQuestion element={element} index={index} key={index} />
				})
			}
      <div className="exercise-submit">
        <ButtonSmall type="submit" content="Klaar" color="primary"/>
      </div>
			<span className="exercise-restart" onClick={redoExercise}>Herbeginnen</span>
		</form>
	)
};

export default Exercises;
