import React from 'react';

// Import components
import { ButtonLarge, Progress } from '../components'
import { DefaultImage } from '../assets/images';
const Dashboard = () => {

    return (
        <div className="dashboard">
			<div className="dashboard-card">
				<div className="dashboard-card-content">
					<div className="dashboard-card-content-text">
						<h3 className="dashboard-card-content-text__title">Goeiemiddag, Annelies!</h3>
						<p className="dashboard-card-content-text__text">Je was voor het laatst gebleven aan wegwijzer 4</p>
					</div>
					<div className="dashboard-card-content-button">
						<ButtonLarge content="Ga verder"/>
					</div>
				</div>
				<div className="dashboard-card-image">
					<img className="dashboard-card-image__image" src={ DefaultImage } alt="RouteZ"/>
				</div>
			</div>

			<Progress/>
        </div>
    )
};

export default Dashboard;