import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// Services
import { AuthProvider } from './services';

// Utils
import { RouteCheck } from './utils';

// Routes
import * as Routes from './routes';

// Pages
import { Signin } from './pages';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './_sass/_index.scss';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <RouteCheck tokenNeeded={false} path={Routes.SIGNIN} component={Signin} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
