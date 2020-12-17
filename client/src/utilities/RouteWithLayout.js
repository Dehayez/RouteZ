import { default as React, useEffect } from 'react';
import { Route as ReactRoute, useHistory } from 'react-router';

import { useAuth } from '../services';

const renderMergedProps = (component, layout, routeProps) => {
  return (layout) ? React.createElement(layout, routeProps, React.createElement(component, routeProps)) : React.createElement(component, routeProps);
};

const RouteWithLayout = ({ component, layout, ...rest }) => {
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push('/dashboard');
    };
  });

  return (
    <ReactRoute {...rest} render={routeProps => {
      return renderMergedProps(component, layout, routeProps);
    }} />
  );
};

export default RouteWithLayout;