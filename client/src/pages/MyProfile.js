import React, { useCallback, useEffect, useState } from 'react';

// Import services
import { useAuth } from '../services';

// Import component
import { ButtonSmall } from '../components';
import { DefaultImage } from '../assets/images';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MyProfile = () => {
    // Use services
   /*  const { getMyself, currentUser } = useAuth();

    // All accessable data
    const [ user, setUser ] = useState();
    const [ avatar, setAvatar ] = useState();

    const getAllData = useCallback(() => {
        const easyFetch = async () => {
            // All user information
            const userData = await getMyself(currentUser.token);
            setUser(userData);

            // Get users avatar, if he has one
            if (userData.profile.avatar) {
                setAvatar(userData.profile.avatar);
            };
        };

        easyFetch();
    }, [getMyself, currentUser.token]);

    useEffect(() => {
        getAllData();
	}, [getAllData]); */
	
	const percentage = 80;

    return (
        <div className="profile">
			<div className="profile-buttons">
				<ButtonSmall content="Mijn materiaal" color="primary"/>
				<ButtonSmall content="Instellingen" color="secondary"/>
			</div>

			<div className="profile-info">
				<div className="profile-info__image">
					<img src={ DefaultImage } alt="annelies"/>
				</div>
				<div className="profile-info__text">
					<p className="profile-info__text-name">Annelies Dedecker</p>
					<p className="profile-info__text-mail">annelies.dedecker@hotmail.be</p>
					<p className="profile-info__text-school">BSGO Herzele De trampoline</p>
				</div>
			</div>

			<div className="profile-progression">
				<h4 className="profile-progression-title">Progressie</h4>
				<div className="profile-progression-charts">

					<div className="profile-progression-chart">
						<h6 className="profile-progression-chart__title">Aanleren</h6>
						<div className="profile-progression-chart__percentage">
							<CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
							
								// Text size
								textSize: '18px',
							
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
							
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
							
								// Colors
								pathColor: `rgba(74, 132, 252, ${percentage / 100})`,
								textColor: '#4A84FC',
								trailColor: '#DDECFE',
							})} />
						</div>
					</div>

					<div className="profile-progression-chart">
						<h6 className="profile-progression-chart__title">Aanleren</h6>
						<div className="profile-progression-chart__percentage">
							<CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
							
								// Text size
								textSize: '18px',
							
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
							
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
							
								// Colors
								pathColor: `rgba(74, 132, 252, ${percentage / 100})`,
								textColor: '#4A84FC',
								trailColor: '#DDECFE',
							})} />
						</div>
					</div>

					<div className="profile-progression-chart">
						<h6 className="profile-progression-chart__title">Aanleren</h6>
						<div className="profile-progression-chart__percentage">
							<CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
							
								// Text size
								textSize: '18px',
							
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
							
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
							
								// Colors
								pathColor: `rgba(74, 132, 252, ${percentage / 100})`,
								textColor: '#4A84FC',
								trailColor: '#DDECFE',
							})} />
						</div>
					</div>

					<div className="profile-progression-chart">
						<h6 className="profile-progression-chart__title">Aanleren</h6>
						<div className="profile-progression-chart__percentage">
							<CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
							
								// Text size
								textSize: '18px',
							
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
							
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
							
								// Colors
								pathColor: `rgba(74, 132, 252, ${percentage / 100})`,
								textColor: '#4A84FC',
								trailColor: '#DDECFE',
							})} />
						</div>
					</div>

					<div className="profile-progression-chart">
						<h6 className="profile-progression-chart__title">Aanleren</h6>
						<div className="profile-progression-chart__percentage">
							<CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
							
								// Text size
								textSize: '18px',
							
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
							
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
							
								// Colors
								pathColor: `rgba(74, 132, 252, ${percentage / 100})`,
								textColor: '#4A84FC',
								trailColor: '#DDECFE',
							})} />
						</div>
					</div>

					<div className="profile-progression-chart">
						<h6 className="profile-progression-chart__title">Aanleren</h6>
						<div className="profile-progression-chart__percentage">
							<CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
							
								// Text size
								textSize: '18px',
							
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
							
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
							
								// Colors
								pathColor: `rgba(74, 132, 252, ${percentage / 100})`,
								textColor: '#4A84FC',
								trailColor: '#DDECFE',
							})} />
						</div>
					</div>

					<div className="profile-progression-chart">
						<h6 className="profile-progression-chart__title">Aanleren</h6>
						<div className="profile-progression-chart__percentage">
							<CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
								// Rotation of path and trail, in number of turns (0-1)
								rotation: 0.25,
							
								// Text size
								textSize: '18px',
							
								// How long animation takes to go from one percentage to another, in seconds
								pathTransitionDuration: 0.5,
							
								// Can specify path transition in more detail, or remove it entirely
								// pathTransition: 'none',
							
								// Colors
								pathColor: `rgba(74, 132, 252, ${percentage / 100})`,
								textColor: '#4A84FC',
								trailColor: '#DDECFE',
							})} />
						</div>
					</div>

				</div>
			</div>
		</div>
    )
};

export default MyProfile;