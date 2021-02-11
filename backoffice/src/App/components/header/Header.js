import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Images
import Logo from '../../assets/logos/RouteZ-logo-color.png';

// Services
import { useAuth } from '../../services';

// Config
import * as Config from '../../config';

// Routes
import * as Routes from '../../routes';

// CSS
import './_Header.scss';

const Header = () => {
  // Routing
  const history = useHistory();

  // Services
  const { getMyself, currentUser } = useAuth();

  // States
  const [ user, setUser ] = useState();

  const getUser = useCallback(async () => {
    try {
      const data = await getMyself(currentUser.token);
      setUser(data);
    } catch (e) {
      console.log(e);
    };
  }, [getMyself, currentUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <header className="header">
      <div className="header__content d-flex justify-content-md-between justify-content-center align-items-center">
        <img onClick={() => history.push(Routes.DASHBOARD)} src={Logo} alt="logo" />
        {
          user && (
            <span onClick={() => history.push(Routes.USER.replace(':id', user._id))} className="header__content--avatar" style={{
              backgroundImage: user.profile.avatar ? `url(${Config.apiConfig.baseURL}file/${user.profile.avatar})` : `url(${Logo})`,
            }}></span>
          )
        }
      </div>
    </header>
  );
};

export default Header;
