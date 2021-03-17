import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Import services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

// Import partials
import { Exercises, Theory } from '../partials';

// Import components
import { BackLinks, ButtonSmall } from '../components';

const Path = () => {
    const history = useHistory();
    const { id, type, order } = useParams();

    // Services
    const { getPath, getModules, getSignPosts } = useApi();
    const { currentUser, editProgress, getMyself, editLast } = useAuth();

    // Some states
    const [ path, setPath ] = useState();
    const [ paths, setPaths ] = useState();
    const [ pathIndex, setPathIndex ] = useState();

    const [ moduleSet, setModuleSet ] = useState();
    const [ signpost, setSignpost ] = useState();

    const [ exercises, setExercises ] = useState();
    const [ exerciseDone, setExerciseDone ] = useState(true);

    const [ currentUserData, setCurrentUserData ] = useState();

    const getAllData = useCallback(() => {
        const fetchData = async () => {
          try {
            if (currentUser) {
              let moduleId;

              const pathData = await getPath(currentUser.token, id);
              console.log(pathData);
              const moduleData = await getModules(currentUser.token);
              const signpostData = await getSignPosts(currentUser.token);
              const userData = await getMyself(currentUser.token);

              setCurrentUserData(userData);

              if (pathData.type === "Oefeningen") setExerciseDone(false);

              for (let i = 0; i < moduleData.length; i++) {
                for (let j = 0; j < moduleData[i]._pathIds.length; j++) {
                  if (moduleData[i]._pathIds[j]._id === pathData._id) {
                    setPaths(moduleData[i]._pathIds);
                    setPathIndex(j);
                    setModuleSet({id: moduleData[i]._id, title: moduleData[i].title});
                    moduleId = moduleData[i]._id;
                  };
                };
              };

              if (pathData.type === "Oefeningen") setExercises(pathData.exercises);
              setPath(pathData);

              for (let i = 0; i < signpostData.length; i++) {
                for (let j = 0; j < signpostData[i].modules.length; j++) {
                  if (signpostData[i].modules[j]._id === moduleId) {
                    setSignpost(signpostData[i]);
                  }
                }
              };
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

      await editLast(currentUser.token, {
        moduleId: moduleSet.id,
        signpostId: signpost._id,
      });

      if (pathIndex === paths.length-1) {
        await editProgress(currentUser.token, {
          moduleId: moduleSet.id,
        });

        history.push(`${Routes.MODULE.replace(':id', moduleSet.id)}`);
      } else {
        history.push(`${Routes.PATH.replace(':id', paths[pathIndex+1]._id).replace(':type', paths[pathIndex+1].type.toLowerCase()).replace(':order', 1)}`);
      };
    };

    const previousPath = async () => {
      history.push(`${Routes.PATH.replace(':id', paths[pathIndex-1]._id).replace(':type', paths[pathIndex-1].type.toLowerCase()).replace(':order', 1)}`);
    };

    return (
        <>
        {
             path && currentUserData && (
                <div className="signpost">
					{
					signpost && <BackLinks 
						links={[
						{
							path: `${Routes.SIGNPOSTS}`,
							route: "wegwijzers "
						},
						{
							path: `${Routes.SIGNPOST.replace(':id', signpost._id)}`,
							route: ` > ${signpost.title}`
						},
						{
							path: `${Routes.MODULE.replace(':id', moduleSet.id)}`,
							route: ` > ${moduleSet.title}`
						},
						{
							path: `${Routes.PATH.replace(':id', path._id).replace(':order', 1).replace(':type', path.type.toLowerCase())}`,
							route: ` > ${path.title}`
						},
						]}
					/>
					}
					{
						path.type === 'Theorie' && (
							<Theory content={path} order={order} />
						)
					}
					{
						path.type === 'Oefeningen' && exercises && (
							<Exercises previousResults={currentUserData.progress._finishedExercises} exercises={exercises} exerciseDone={exerciseDone} setExerciseDone={setExerciseDone} />
						)
					}
					<div className="order-buttons">
						{
						pathIndex !== 0 && (
							<ButtonSmall onClick={previousPath} color="secondary" content="Vorige"/>
						)
						}
						<ButtonSmall onClick={completePath} color="secondary" content="Volgende"/>
					</div>
                </div>
            )
        }
        </>
    )
};

export default Path;