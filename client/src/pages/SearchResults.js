import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

// Routes
import * as Routes from '../routes';

// Services
import { useApi, useAuth } from '../services';

const SearchResults = () => {
  // Routing
  const history = useHistory();

  // Services
  const { searchEverything } = useApi();
  const { currentUser } = useAuth();

  // Check if states has been sended
  const { state } = useLocation();
  const keywords = state.keywords;

  // States
  const [ fullResults, setFullResults ] = useState();
  const [ formValue, setFormValue ] = useState(keywords ? keywords : '');

  // Fetch results
  const fetchResults = useCallback(async () => {
    try {
      const result = await searchEverything(currentUser.token, keywords);
      setFullResults(result);
    } catch (e) {
      history.push(Routes.NOT_FOUND);
    };
  }, [history, searchEverything, keywords, currentUser]);

  useEffect(() => {
    if (keywords) {
      fetchResults();
    };
  }, [keywords, fetchResults])

  // Search results
  const searchAgain = async (e) => {
    e.preventDefault();

    const result = await searchEverything(currentUser.token, formValue);
    setFullResults(result);
  };

  return (
    <>
    <form onSubmit={(e) => searchAgain(e)}>
      <input name="search" type="text" id="search" onChange={(e) => setFormValue(e.target.value)} defaultValue={formValue} />
    </form>
    {
      fullResults ? (
        fullResults.length === 0 ? (
          <>
            <p>Er zijn geen items gevonden</p>
          </>
        ) : (
          <>
            <p>{`Er ${fullResults.count === 1 ? 'is' : 'zijn'} ${fullResults.count} ${fullResults.count === 1 ? 'item' : 'items'} gevonden`}</p>
            <hr/>
            {
              fullResults.results.map((item, index) => {
                return (
                  <NavLink key={index} to={item.path}>
                    <span>
                      <strong>{item.title}</strong><br />
                      <span>{item.tag}</span><br/>
                      <span>{item.bottomText}</span>
                    </span>
                    <hr />
                  </NavLink>
                )
              })
            }
          </>
        )
      ) : (
        ''
      )
    }
    </>
  );
};

export default SearchResults;
