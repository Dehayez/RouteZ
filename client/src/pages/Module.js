import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams, Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';

import ReactHtmlParser from 'react-html-parser';

// Import services
import { useAuth, useApi } from '../services';

// Import routes
import * as Routes from '../routes';

// Import partials
import { CardMaterials } from '../partials';

// Import components
import { BackLinks, ButtonSmall, CompletedDoc } from '../components';
import { HiOutlinePrinter, HiOutlineCheck } from 'react-icons/hi';
import { Row, Col } from 'react-bootstrap';

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
		const [ myself, setMyself ] = useState();

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            try {
                if (currentUser) {
                    const moduleData = await getModule(currentUser.token, id);
                    const userData = await getMyself(currentUser.token);
                    const signpostData = await getSignPosts(currentUser.token);
    
                    setCheckedPaths(userData.progress._finishedPathIds);
                    setModule(moduleData);
										setMyself(userData);
    
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

		const printModule = () => {

		};

    useEffect(() => {
        getAllData();
	}, [getAllData]);

    return (
        <>
        {
            module && myself && (
                <Row className="signpost">
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


					<div className="signpost-header">
						<h1 className="signpost-title">{module.title}</h1>
						{
							checkedModule && (
								<PDFDownloadLink document={<CompletedDoc moduleName={module.title} userName={`${myself.profile.firstName} ${myself.profile.lastName}`} />} fileName="completedModule.pdf">
									{({ blob, url, loading, error }) => (
										loading ? '' : <HiOutlinePrinter className="icon__print" title="Print" />
									)}
								</PDFDownloadLink>
							)
						}
					</div>

					<Col lg={6}>
						{ ReactHtmlParser(module.content) }
					</Col>


					{/** All paths */}
					<Col lg={5} className="signpost-paths">
					{
						module.paths && module.paths.map((path, i) => {
							return <div className="signpost-modules-item" key={i}>
								
									<p className="signpost-paths-item-title">{path.title}</p>
									<div>
										{
											checkedPaths && checkedPaths.map((pathChecked, index) => {
												return pathChecked === path._id && (
													<HiOutlineCheck key={index} className="icon__check"/>
												)
											})
										}
										<Link to={`${Routes.PATH.replace(':type', path.type.toLowerCase()).replace(':id', path._id).replace(':order', 1)}`}>
											<ButtonSmall content="Open" color="secondary"/>
										</Link>
									</div>
							</div>
						})
					}
					</Col>



					{/** All material */}
					{
						checkedModule && (
							<>
								<div className="signpost-extra">
									<p className="signpost-undertitle">Wat anderen hebben gedeeld</p>
									<div className="signpost-extra-buttons">
										<NavLink to={{pathname: Routes.MATERIALS, props: {module: module._id,}}}>
											<ButtonSmall content="Bekijk meer" color="secondary"/>
										</NavLink>
										<NavLink to={{pathname: Routes.ADD_MATERIAL, props: {module: module._id,}}}>
											<ButtonSmall content="Plaats materiaal" color="primary"/>
										</NavLink>
									</div>
								</div>
								<CardMaterials
									materials={module.materials}
									user={currentUser.id}
									token={currentUser.token}
								/>
							</>
						)
					}
                </Row>
            )
        }
        </>
    )
};

export default Module;