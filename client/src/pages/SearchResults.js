import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

// Routes
import * as Routes from '../routes';

// Services
import { useApi, useAuth } from '../services';

// Bootstrap
import { Row, Col } from 'react-bootstrap';

// Components
import { ButtonSmall } from '../components';

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
    <Row className="search">
		<Col className="search-left" lg={4}>
			<form onSubmit={(e) => searchAgain(e)}>
				<input className="search-left-form-input" name="search" type="text" id="search" placeholder="Wegwijzers, modules en materiaal" onChange={(e) => setFormValue(e.target.value)} defaultValue={formValue} />
			</form>
		</Col>

		<Col className="search-right" lg={8}>
			{
				fullResults ? (
					fullResults.length === 0 ? (
						<p className="search-right-indicator">Er zijn geen items gevonden</p>
					) : (
					<>
						<p className="search-right-indicator">{`Er ${fullResults.count === 1 ? 'is' : 'zijn'} ${fullResults.count} ${fullResults.count === 1 ? 'item' : 'items'} gevonden`}</p>
						<div className="search-right-results">
							{
							fullResults.results.map((item, index) => {
								return (
								<div className="search-right-results-item" key={index} to={item.path}>
									<h5 className="search-right-results-item__title">{item.title}</h5>
									<ButtonSmall content={item.tag} color="secondary"/>
									<p className="search-right-results-item__text">{item.bottomText}</p>
								</div>
								)
							})
							}
						</div>
					</>
					)
				) : (
					''
				)
			}
		</Col>
    </Row>
  );
};

export default SearchResults;
