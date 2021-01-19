import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';

// Import services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

// Import partials
import { Exercises, Theory, TipsAndTricks, Video } from '../partials';

// Import components
import { BackLinks } from '../components';

const Path = () => {
    const history = useHistory();
    const { id } = useParams();

    // Services
    const { getPath, getModules, getSignPosts } = useApi();
    const { currentUser, editProgress } = useAuth();

    // Some states
    const [ path, setPath ] = useState();
    const [ paths, setPaths ] = useState();
    const [ pathIndex, setPathIndex ] = useState();

    const [ moduleSet, setModuleSet ] = useState();
    const [ signpost, setSignpost ] = useState();

    const [ exercises, setExercises ] = useState();
    const [ exerciseDone, setExerciseDone ] = useState(true);

    const getAllData = useCallback(() => {
        const fetchData = async () => {
          try {
            if (currentUser) {
              const pathData = await getPath(currentUser.token, id);
              const moduleData = await getModules(currentUser.token);
              const signpostData = await getSignPosts(currentUser.token);

              if (pathData.type === "Oefeningen") setExerciseDone(false);

              for (let i = 0; i < moduleData.length; i++) {
                if (moduleData[i]._pathIds.includes(pathData._id)) {
                  const importantIndex = moduleData[i]._pathIds.indexOf(pathData._id);
                  setPaths(moduleData[i]._pathIds);
                  setPathIndex(importantIndex);
                  setModuleSet({id: moduleData[i]._id, title: moduleData[i].title});

                  for (let j = 0; j < signpostData.length; j++) {
                    if (signpostData[j]._moduleIds.includes(moduleData[i]._id)) {
                        setSignpost(signpostData[j]);
                    };
                  };
                };
              };

              if (pathData.type === "Oefeningen") setExercises(pathData.exercises);
              setPath(pathData);
            };
          } catch (e) {
            history.push(Routes.NOT_FOUND);
          };
        };

        fetchData();
    }, [getPath, getModules, getSignPosts , history, currentUser, id]);

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    const completePath = async () => {
      await editProgress(currentUser.token, {
        pathId: path._id,
      });

      if (pathIndex === paths.length-1) {
        history.push(`${Routes.MODULE.replace(':id', moduleSet.id)}`);
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
                  signpost && <BackLinks 
                    links={[
                      {
                          path: `${Routes.SIGNPOSTS}`,
                          route: "wegwijzers"
                      },
                      {
                          path: `${Routes.SIGNPOST.replace(':id', signpost._id)}`,
                          route: `>${signpost.title}`
                      },
                      {
                        path: `${Routes.MODULE.replace(':id', moduleSet.id)}`,
                        route: `>${moduleSet.title}`
                      },
                      {
                        path: `${Routes.PATH.replace(':id', path._id)}`,
                        route: `>${path.title}`
                      },
                    ]}
                  />
                }
                {
                  path.type === 'Theorie' && (
                    <Theory html={ReactHtmlParser(path.theoryText)} />
                  )
                }
                {
                  path.type === 'Video' && (
                    <Video url={path.videoUrl} />
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