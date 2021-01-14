import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import components
import { FilterSelect } from '../components';

// Import routes
import * as Routes from '../routes';

// Import services
import { useApi, useAuth } from '../services';

const Materials = () => {
  const history = useHistory();

  // Services
  const { getSignPosts } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ signposts, setSignposts ] = useState();

  // Simple fetch of all data
  const getData = useCallback(async () => {
    try {
      const signpostData = await getSignPosts(currentUser.token);
      setSignposts(signpostData);
    } catch (e) {
      history.push(Routes.NOT_FOUND);
    };
  }, [getSignPosts, history, currentUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
    {
      signposts && (
        <form>
          {/** Keywords */}
          <input type="text" name="keywords" id="keywords" placeholder="Zoek op basis van kernwoorden" />
          {/** Select type of file */}

          {/** Select module/signpost */}
          <FilterSelect
            sections={true}
            options={signposts}
          />
        </form>
      )
    }
    </>
  );
};

export default Materials;
