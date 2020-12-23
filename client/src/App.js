import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// All pages
import { Dashboard, Landing, Login, Register, SendReset, SubmitReset } from './pages';

// Main layouts
import { PageLayout, AuthLayout } from './layouts';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';

// All routes
import * as Routes from './routes';

// All services
import { ApiProvider, AuthProvider } from './services';

import './App.scss';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>
              {/** Where the site lands */}
              <RouteWithLayout exact path={Routes.LANDING} component={Landing} layout={PageLayout} />
              {/** Main pages for authentication */}
			        <RouteWithLayout exact path={Routes.AUTH_SIGN_IN} component={Login} layout={AuthLayout} />
              <RouteWithLayout exact path={Routes.AUTH_SIGN_UP} component={Register} layout={AuthLayout} />
              <RouteWithLayout exact path={Routes.AUTH_RESET} component={SendReset} layout={AuthLayout} />
              <RouteWithLayout exact path={Routes.AUTH_SUBMIT} component={SubmitReset} layout={AuthLayout} />
              {/** Platform pages */}
              <AuthRouteWithLayout exact path={Routes.DASHBOARD} component={Dashboard} layout={PageLayout} />
              <AuthRouteWithLayout exact path={Routes.MY_PROFILE} component={Routes.MY_PROFILE} layout={PageLayout} />
            </Switch>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
