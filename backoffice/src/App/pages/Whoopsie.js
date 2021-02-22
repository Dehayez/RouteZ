import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { UsualButton } from '../components';

// Routes
import * as Routes from '../routes';

// CSS
import './_Whoopsie.scss';

const Whoopsie = () => {
  // Routing
  const history = useHistory();

  return (
    <main className="whoopsie">
      <section className="whoopsie__content">
        <h1>Ola, er is iets fout!</h1>
        <h5>Er lijkt iets te zijn mislukt maar geen probleem, er is een oplossing.</h5>
        <div className="whoopsie__content--button d-flex justify-content-center">
          <UsualButton text="Meld je opnieuw aan" action={() => history.push(Routes.SIGNIN)} />
        </div>
      </section>
    </main>
  );
};

export default Whoopsie;
