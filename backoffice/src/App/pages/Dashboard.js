import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

// Layout
import { UsualLayout } from '../layouts';

// Services
import { useApi, useAuth } from '../services';

// Components
import { Chart, DashboardButton } from '../components';

// Routes
import * as Routes from '../routes';

// Images
import Signpost from '../assets/icons/signpost.png';
import Material from '../assets/icons/material.png';
import Module from '../assets/icons/module.png';
import User from '../assets/icons/user.png';
import Hashtag from '../assets/icons/hashtag.png';

// CSS
import './_Dashboard.scss';

const Dashboard = () => {
  // States
  const [ user, setUser ] = useState();
  const [ viewChart, setViewChart ] = useState();

  // Services
  const { getMyself, currentUser } = useAuth();
  const { viewCharts } = useApi();

  // Fetch
  const fetchUser = useCallback(async () => {
    try {
      const data = await getMyself(currentUser.token);
      const chartsData = await viewCharts(currentUser.token);

      setViewChart(chartsData);
      setUser(data);
    } catch (e) {
      console.log(e);
    };
  }, [getMyself, currentUser, viewCharts]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return user ? (
    <UsualLayout>
      <Row>
        <Col xs={12} md={12} lg={6}>
          <h1 className="dashboard__title">
            Welkom op jouw paneel, {user.profile.firstName}! 😊<br/>
            <span>Wat zou je graag willen bekijken?</span>
          </h1>
        </Col>
        <Col xs={12} lg={6}>
          <Row>
            <DashboardButton text={"Wegwijzers"} path={Routes.SIGNPOSTS} icon={Signpost} />
            <DashboardButton text={"Modules"} path={Routes.MODULES} icon={Module} />
            <DashboardButton text={"Materiaal"} path={Routes.MATERIALS} icon={Material} />
            <DashboardButton text={"Gebruikers"} path={Routes.USERS} icon={User} />
            <DashboardButton text={"Tags"} path={Routes.TAGS} icon={Hashtag} />
          </Row>
        </Col>
        <Col xs={12} md={12} lg={6}>
          {
            viewChart && (
              <Chart data={viewChart.signpostsStats} title="Engagement wegwijzers" />
            )
          }
        </Col>
        <Col xs={12} md={12} lg={6}>
          {
            viewChart && (
              <Chart data={viewChart.modulesStats} title="Engagement modules" />
            )
          }
        </Col>
      </Row>
    </UsualLayout>
  ) : '';
};

export default Dashboard;
