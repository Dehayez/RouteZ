import React from 'react';

const Exercises = ({exercises, setExerciseDone, exerciseDone}) => {
  const Question = ({element, index}) => {
    return element.multiple ? (
      <fieldset name={`question${index}`}>
        <legend>
          {element.question}
        </legend>
        {
          element.answers.map((innerElement, innerIndex) => {
            return <span key={innerIndex}><input type="checkbox" id={innerElement._id} value={innerElement.text} name={`question${index}`} /><label>{innerElement.text}</label></span>
          })
        }
      </fieldset>
    ) : (
      <fieldset name={`question${index}`}>
        <legend>
          {element.question}
        </legend>
        {
          element.answers.map((innerElement, innerIndex) => {
            return <span key={innerIndex}><input type="radio" id={innerElement._id} value={innerElement.text} name={`question${index}`} /><label>{innerElement.text}</label></span>
          })
        }
      </fieldset>
    )
  };

  const submitExercise = (e) => {
    e.preventDefault();

    let questionIndex = 0;
    let answerIndex = 0;

    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].localName === 'fieldset') {
        questionIndex = questionIndex + 1;

        // console.log('Vraag', questionIndex-1);
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
                // console.log('Antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is juist');
                document.getElementById(id).classList.add('correct-answer');
              } else {
                // console.log('Antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is onjuist');
                document.getElementById(id).classList.add('wrong-answer');
              };
            };

            // Check if they put it as incorrect
            if (result === false) {
              // Check if it's also incorrect
              if (result === exercises[questionIndex-1].answers[answerIndex-1].correct) {
                // console.log('Geen antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is juist');
              } else {
                // console.log('Geen antwoord ', answerIndex-1 ,' op vraag ', questionIndex-1, ' is onjuist');
                document.getElementById(id).classList.add('correct-answer');
              };
            };
          };
        };
      };
    };

    setExerciseDone(true);
  };

  const redoExercise = () => {
    window.location.reload();
  };


  return (
    <form onSubmit={(e) => submitExercise(e)}>
      {
        exercises.map((element, index) => {
          return <Question key={index} index={index} element={element} />
        })
      }
      {
        !exerciseDone && (
          <button type="submit">Klikkerdeklik</button>
        )
      }
      <span onClick={redoExercise}>Herbeginnen</span>
    </form>
  )
};

export default Exercises;
