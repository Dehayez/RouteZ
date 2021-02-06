import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

// Import services
import { useAuth, useApi } from '../services';

// Import components
import { BackLinks, ButtonSmall } from '../components';

// Import config
import { apiConfig } from '../config';

// Import routes
import * as Routes from '../routes';

const Signpost = () => {
    const { id } = useParams();
    const history = useHistory();

    // Services
    const { getSignPost } = useApi();
    const { currentUser } = useAuth();

    // Some states
    const [ signpost, setSignpost ] = useState();

    const getAllData = useCallback(() => {
        const fetchData = async () => {
            if (currentUser) {
                const signpostData = await getSignPost(currentUser.token, id);
                setSignpost(signpostData);
            };
        };

        fetchData();
    }, [getSignPost, currentUser, id]);

	// fout; object object in url
    const goToModule = (id) => {
        history.push(`/modules/${id}`);
    };

    useEffect(() => {
        getAllData();
	}, [getAllData]);

    return (
		<>
		{
			signpost && (
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
										route: `>  ${signpost.shortedTitle}`
									},
								]}
							/>
						)
					}
					<h1 className="signpost-title">{ signpost.title }</h1>
					<p className="signpost-text">{ signpost.text }</p>

					<img className="signpost-illustration" src={`${apiConfig.baseURL}file/${signpost.illustration}`}/>

					<div className="signpost-modules">
						<h5 className="signpost-modules-title">Modules</h5>
						{
							signpost && (
								signpost.modules && signpost.modules.map((module, i) => {
									return <div className="signpost-modules-item" key={i}>
										<p className="signpost-modules-item-title">{module.title}</p>
										<div>
											<Link to={`${Routes.MODULE.replace(':id', module._id)}`}>
												<ButtonSmall content="Start" color="secondary"/>
											</Link>
										</div>
									</div>
								})
							)
						}
					</div>
				</div>
				
			)
		}
		</>
    )
};

export default Signpost;