import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import { TestPage } from './pages';
import { PageLayout } from './layouts';
import { AuthRouteWithLayout, RouteWithLayout } from './utilities';
import * as Routes from './routes';
import { ApiProvider, AuthProvider } from './services';

import './App.scss';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ApiProvider>
          <Router basename='/'>
            <Switch>
				<RouteWithLayout exact path={Routes.TEST} component={TestPage} layout={PageLayout} />
            </Switch>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
