import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// Services
import { ApiProvider, AuthProvider } from './services';

// Utils
import { RouteCheck } from './utils';

// Routes
import * as Routes from './routes';

// Pages
import { Dashboard, Signin, Signposts } from './pages';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './_sass/_index.scss';

const App = () => {
  return (
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <Switch>
            <RouteCheck tokenNeeded={false} path={Routes.SIGNPOSTS} component={Signposts} />
            <RouteCheck tokenNeeded={true} path={Routes.DASHBOARD} component={Dashboard} />
            <RouteCheck tokenNeeded={false} path={Routes.SIGNIN} component={Signin} />
          </Switch>
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  );
};

export default App;
