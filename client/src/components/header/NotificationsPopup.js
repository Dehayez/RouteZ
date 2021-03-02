import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// Routes
import * as Routes from '../../routes';

const NotificationsPopup = ({ notifications }) => {
  const history = useHistory();

  return (
    <div>
      {
        notifications.length !== 0 ? notifications.map((notification, index) => {
          return (
            <div key={index} onClick={() => history.push(notification.type === 'material' ? Routes.MATERIAL.replace(':name', notification._materialId) : notification.type === 'reward' ? Routes.MY_PROFILE : notification.type === 'signpost' ? Routes.SIGNPOST.replace(':id', notification._signpostId) : Routes.MODULE.replace(':id', notification._moduleId))}>
              {/** Elke icon is verschillend per type, hardcoded erin steken */}
              <div>
                {
                  notification.type === 'material' && ''
                }
                {
                  notification.type === 'reward' && ''
                }
                {
                  notification.type === 'module' && ''
                }
                {
                  notification.type === 'signpost' && ''
                }
              </div>
              <div>
                {notification.text}
              </div>
            </div>
          )
        }) : (
          'Alle notificaties zijn gelezen'
        )
      }
      <NavLink to={Routes.NOTIFICATIONS}>Bekijk meer...</NavLink>
    </div>
  );
};

export default NotificationsPopup;
