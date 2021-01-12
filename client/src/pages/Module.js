import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';

// Import services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

// Import partials
import { CardMaterials } from '../partials';

const Module = () => {
    const { id } = useParams();

    // Services
    const { getModule } = useApi();
    const { currentUser, getMyself } = useAuth();

    // Some states
    const [ module, setModule ] = useState();
    const [ checkedPaths, setCheckedPaths ] = useState();
    const [ checkedModule, setCheckedModule ] = useState(false);

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            if (currentUser) {
                const moduleData = await getModule(currentUser.token, id);
                const userData = await getMyself(currentUser.token);
                setCheckedPaths(userData.progress._finishedPathIds);
                setModule(moduleData);

                if (userData.progress._finishedModuleIds.includes(moduleData._id)) {
                    setCheckedModule(true);
                };
            };
        };

        fetchData();
    }, [getModule, currentUser, getMyself, id]);

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    return (
        <>
        {
            module && (
                <>
                {/** Back buttons */}
                
                {/** Main HTML */}
                <h1 style={{padding: '30px 0px'}}>{module.title}</h1>
                {
                    checkedModule && (
                        <button>Print</button>
                    )
                }
                {
                    ReactHtmlParser(module.content)
                }
                {/** All paths */}
                <h1 style={{padding: '30px 0px'}}>Alle paden</h1>
                {
                    module.paths && module.paths.map((path, index) => {
                        return <div key={index}>
                            <NavLink to={`${Routes.PATH.replace(':id', path._id)}`}>
                                <span>{path.title}</span>
                                <button>
                                    Open
                                </button>
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
                <h1 style={{padding: '30px 0px'}}>Wat anderen hebben gedeeld:</h1>
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
                </>
            )
        }
        </>
    )
};

export default Module;