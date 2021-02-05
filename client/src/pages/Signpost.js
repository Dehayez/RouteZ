import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Import services
import { useAuth, useApi } from '../services';

// Import components
import { BackLinks, ButtonSmall } from '../components';

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

    const goToModule = (id) => {
        history.push(`/modules/${id}`);
    };

    useEffect(() => {
        getAllData();
	}, [getAllData]);
	
	console.log(signpost);

    return (
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
			{
				signpost && (
					<h1 className="signpost-title">{ signpost.title }</h1>
				)
			}

			{
				signpost && (
					<p className="signpost-text">{ signpost.text }</p>
				)
			}

			<div className="signpost-modules">
				<h5 className="signpost-modules-title">Modules</h5>
				{
					signpost && (
						signpost.modules && signpost.modules.map((module, i) => {
							return <div className="signpost-modules-item" key={i}>
								<p lassName="signpost-modules-item-title">{module.title}</p>
								<div>
									<ButtonSmall content="Start" color="secondary"/>
								</div>
							</div>
						})
					)
				}
			</div>
        </div>
    )
};

export default Signpost;