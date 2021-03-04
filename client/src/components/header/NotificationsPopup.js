import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// Routes
import * as Routes from '../../routes';

import Icon from '../../assets/icons/arrow-blue.svg';

import './Header.scss';

const NotificationsPopup = ({ notifications }) => {
  const history = useHistory();

  return (
    <div className="header-notifications-wrapper">
		<h2 className="header-notifications-wrapper__title">Meldingen</h2>
		<div className="header-notifications-wrapper-content">
		{
			notifications.length !== 0 ? notifications.map((notification, index) => {
			return (
				<div className="header-notifications-wrapper-content-item" key={index} onClick={() => history.push(notification.type === 'material' ? Routes.MATERIAL.replace(':name', notification._materialId) : notification.type === 'reward' ? Routes.MY_PROFILE : notification.type === 'signpost' ? Routes.SIGNPOST.replace(':id', notification._signpostId) : Routes.MODULE.replace(':id', notification._moduleId))}>
				{/** Elke icon is verschillend per type, hardcoded erin steken */}
					<div className="header-notifications-wrapper-content-item__icon-wrapper">
						{
						notification.type === 'material' && <img className="header-notifications-wrapper-content-item__icon" src={ Icon } alt="material"/>
						}
						{
						notification.type === 'reward' &&  <img className="header-notifications-wrapper-content-item__icon" src={ Icon } alt="material"/>
						}
						{
						notification.type === 'module' &&  <img className="header-notifications-wrapper-content-item__icon" src={ Icon } alt="material"/>
						}
						{
						notification.type === 'signpost' &&  <img className="header-notifications-wrapper-content-item__icon" src={ Icon } alt="material"/>
						}
					</div>
					<div lassName="header-notifications-wrapper-content-item__text">
						{notification.text}
					</div>
				</div>
			)
			}) : (
			'Alle notificaties zijn gelezen'
			)
		}
	  </div>
      <NavLink to={Routes.NOTIFICATIONS} className="header-notifications-wrapper__more">Bekijk alle meldingen</NavLink>
    </div>
  );
};

export default NotificationsPopup;
