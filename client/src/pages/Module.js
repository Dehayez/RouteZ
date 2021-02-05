import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';

// Import services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

// Import partials
import { CardMaterials } from '../partials';

// Import components
import { BackLinks } from '../components';
import { HiOutlinePrinter } from 'react-icons/hi';

const Module = () => {
    const { id } = useParams();
    const history = useHistory();

    // Services
    const { getModule, getSignPosts } = useApi();
    const { currentUser, getMyself } = useAuth();

    // Some states
    const [ module, setModule ] = useState();
    const [ signpost, setSignpost ] = useState();
    const [ checkedPaths, setCheckedPaths ] = useState();
    const [ checkedModule, setCheckedModule ] = useState(false);

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            try {
                if (currentUser) {
                    const moduleData = await getModule(currentUser.token, id);
                    const userData = await getMyself(currentUser.token);
                    const signpostData = await getSignPosts(currentUser.token);
    
                    setCheckedPaths(userData.progress._finishedPathIds);
                    setModule(moduleData);
    
                    for (let i = 0; i < signpostData.length; i++) {
                        if (signpostData[i]._moduleIds.includes(moduleData._id)) {
                            setSignpost(signpostData[i]);
                        };
                    };
    
                    if (userData.progress._finishedModuleIds.includes(moduleData._id)) {
                        setCheckedModule(true);
                    };
                };
            } catch (e) {
                history.push(Routes.NOT_FOUND);
            };
        };

        fetchData();
    }, [getModule, getSignPosts, currentUser, getMyself, id, history]);

    useEffect(() => {
        getAllData();
	}, [getAllData]);

    return (
        <>
        {
            module && (
                <div className="signpost">
                {
                    signpost && (
						<BackLinks 
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
									path: `${Routes.MODULE.replace(':id', module._id)}`,
									route: ` > ${module.title}`
								}
							]}
						/>
					)
                }


                {/** Main HTML */}
				<div className="signpost-header">
					<h1 className="signpost-title">{module.title}</h1>
					{
						checkedModule && (
							<HiOutlinePrinter className="icon__print" title="Print" />
						)
					}
				</div>

                {
                    ReactHtmlParser(module.content)
                }



                {/** All paths */}
                <h1>Alle paden</h1>
                {
                    module.paths && module.paths.map((path, index) => {
                        return <div key={index}>
                            <NavLink to={`${Routes.PATH.replace(':id', path._id)}`}>
                                <span>{path.title}</span>
                                <button>Open </button>
                            </NavLink>
                            {
                                checkedPaths && checkedPaths.map((pathChecked, index) => {
                                    return pathChecked === path._id && (
                                        <span key={index}>Check</span>
                                    )
                                })
                            }
                        </div>
                    })
                }
                {/** All material */}
                <h1>Wat anderen hebben gedeeld:</h1>
                {
                    checkedModule && (
                        <>
                            <div>
                                <NavLink to={{pathname: Routes.MATERIALS, props: {
                                    module: module._id,
                                }}}>Bekijk meer</NavLink>
                                <NavLink to={{pathname: Routes.ADD_MATERIAL, props: {
                                    module: module._id,
                                }}}>Plaats materiaal</NavLink>
                            </div>
                            <CardMaterials
                                materials={module.materials}
                                user={currentUser.id}
                                token={currentUser.token}
                            />
                        </>
                    )
                }
                </div>
            )
        }
        </>
    )
};

export default Module;