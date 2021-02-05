import { default as React, useEffect } from 'react';
import { Redirect, Route as ReactRoute } from 'react-router';

import { useAuth } from '../services';
import * as Routes from '../routes';

const renderMergedProps = (component, layout, routeProps) => {
  return (layout) ? React.createElement(layout, routeProps, React.createElement(component, routeProps)) : React.createElement(component, routeProps);
};

const RouteWithLayout = ({ component, layout, ...rest }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      return <Redirect to={Routes.LANDING} />
    };
  });

  return (
    <ReactRoute {...rest} render={routeProps => {
      return renderMergedProps(component, layout, routeProps);
    }} />
  );
};

export default RouteWithLayout;