import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Services
import { useAuth } from '../services';

// Routes
import * as Routes from '../routes';

const RouteCheck = ({ tokenNeeded, component, path }) => {
  // Services
  const { currentUser } = useAuth();

  return (
    tokenNeeded ? currentUser ? <Route exact path={path} component={component} /> : <Redirect to={Routes.WHOOPSIE} /> : <Route exact path={path} component={component} />
  );
};

export default RouteCheck;
