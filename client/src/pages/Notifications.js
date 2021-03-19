import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import 'moment/locale/nl-be';

import { AnimationOnScroll } from 'react-animation-on-scroll';

// Services
import { useApi, useAuth } from '../services';

// Icons notifs
import material from '../assets/illustrations/notifications/Notification_material2.1.svg';
import reward from '../assets/illustrations/notifications/Notification_reward2.svg'

// Routes
import * as Routes from '../routes';

const Notifications = () => {
  const history = useHistory();

  // Services
  const { getNotifications, readNotifications } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ notifications, setNotifications ] = useState();

  // Fetch
  const fetchData = useCallback(async () => {
    try {
      const notificationsData = await getNotifications(currentUser.token);
      await readNotifications(currentUser.token);
      setNotifications(notificationsData);
    } catch (e) {
      setNotifications(false);
    };
  }, [getNotifications, readNotifications, currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="notifications">
      {
        notifications ? notifications.length !== 0 ? notifications.map((notification, index) => {
          return (
			<AnimationOnScroll animateIn="animate__fadeIn">
				<div className="notifications-item" key={index} onClick={() => history.push(notification.type === 'material' ? Routes.MATERIAL.replace(':name', notification._materialId) : notification.type === 'reward' ? Routes.MY_PROFILE : notification.type === 'signpost' ? Routes.SIGNPOST.replace(':id', notification._signpostId) : Routes.MODULE.replace(':id', notification._moduleId))}>
					<div className="notifications-item-icon">
						{
							notification.type === 'material' && <img src={ material} alt="material"/>
						}
						{
							notification.type === 'reward' && <img src={ reward} alt="material"/>
						}
						{
							notification.type === 'module' && <img src={ material} alt="material"/>
						}
						{
							notification.type === 'signpost' && <img src={ material} alt="material"/>
						}
					</div>
					<div className="notifications-item-text">
						<div className="notifications-item-text__text">
							{notification.text}
						</div>
						<div className="notifications-item-text__date">
							{
								Moment(Date.now()).diff(Moment(notification._createdAt), 'days')  !== 0 ? `${Moment(Date.now()).diff(Moment(notification._createdAt), 'days')} ${Moment(Date.now()).diff(Moment(notification._createdAt), 'days') > 1 ? 'dagen' : 'dag'}  geleden` : Moment(Date.now()).diff(Moment(notification._createdAt), 'hours') !== 0 ? `${Moment(Date.now()).diff(Moment(notification._createdAt), 'hours')} ${Moment(Date.now()).diff(Moment(notification._createdAt), 'hours') > 1 ? 'uren' : 'uur'} geleden` : `${Moment(Date.now()).diff(Moment(notification._createdAt), 'minutes')} ${Moment(Date.now()).diff(Moment(notification._createdAt), 'minutes') > 1 ? 'minuten' : 'minuut'} geleden`
							}
						</div>
					</div>
				</div>
			</AnimationOnScroll>
          )
        }) : 'Er zijn nog geen meldingen': 'Er zijn nog geen meldingen'
      }
    </div>
  );
};

export default Notifications;
