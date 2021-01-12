import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';

// Import services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

// Import partials
import { Exercises, Theory, TipsAndTricks } from '../partials';

const Path = () => {
    const history = useHistory();
    const { id } = useParams();

    // Services
    const { getPath, getModules } = useApi();
    const { currentUser, editProgress } = useAuth();

    // Some states
    const [ path, setPath ] = useState();
    const [ paths, setPaths ] = useState();
    const [ pathIndex, setPathIndex ] = useState();

    const [ module, setModule ] = useState();

    const [ exercises, setExercises ] = useState();
    const [ exerciseDone, setExerciseDone ] = useState(true);

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            if (currentUser) {
                const pathData = await getPath(currentUser.token, id);
                const moduleData = await getModules(currentUser.token);

                if (pathData.type === "Oefeningen") setExerciseDone(false);

                for (let i = 0; i < moduleData.length; i++) {
                  if (moduleData[i]._pathIds.includes(pathData._id)) {
                    const importantIndex = moduleData[i]._pathIds.indexOf(pathData._id);
                    setPaths(moduleData[i]._pathIds);
                    setPathIndex(importantIndex);
                    setModule(moduleData[i]._id);
                  };
                };

                if (pathData.type === "Oefeningen") setExercises(pathData.exercises);
                setPath(pathData);
            };
        };

        fetchData();
    }, [getPath, getModules, currentUser, id]);

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    const completePath = async () => {
      await editProgress(currentUser.token, {
        pathId: path._id,
      });

      if (pathIndex === paths.length-1) {
        history.push(`${Routes.MODULE.replace(':id', module)}`);
      } else {
        history.push(`${Routes.PATH.replace(':id', paths[pathIndex+1])}`);
      };
    };

    const previousPath = async () => {
      history.push(`${Routes.PATH.replace(':id', paths[pathIndex-1])}`);
    };

    return (
        <>
        {
            path && (
                <>
                {
                  path.type === 'Theorie' && (
                    <Theory html={ReactHtmlParser(path.theoryText)} />
                  )
                }
                {
                  path.type === 'Video' && (
                    ''
                  )
                }
                {
                  path.type === 'Tips and Tricks' && (
                    <TipsAndTricks html={ReactHtmlParser(path.theoryText)} />
                  )
                }
                {
                  path.type === 'Oefeningen' && exercises && (
                    <Exercises exercises={exercises} exerciseDone={exerciseDone} setExerciseDone={setExerciseDone} />
                  )
                }
                {
                  pathIndex !== 0 && (
                    <button onClick={previousPath}>Vorige</button>
                  )
                }
                  <button onClick={completePath}>Volgende</button>
                </>
            )
        }
        </>
    )
};

export default Path;