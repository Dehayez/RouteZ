import { default as React } from 'react';

// Import components
import { NavLink } from 'react-router-dom';
import { LogoColor } from '../../assets/logos';

import './Navigation.scss' 

const Navigation = () => {

  return (
	<div className="nav">

		<div className="nav-header">
			<img className="nav-header__image" src={LogoColor}/>
		</div>

		<nav className="nav-list">
			<NavLink to="/my-profile" className="nav-list-link" activeClassName="nav-link-list--active">
				<img className="nav-list-link-icon"/>
				<div className="nav-list-link-text">
					<span className="nav-list-link-text-span">Wegwijzer 1</span>
					<p className="nav-list-link-text-title">Aanleren</p>
				</div>
			</NavLink>

			<NavLink to="/module/2" className="nav-list-link" activeClassName="nav-link-list--active">
				<img className="nav-list-link-icon"/>
				<div className="nav-list-link-text">
					<span className="nav-list-link-text-span">Wegwijzer 2</span>
					<p className="nav-list-link-text-title">Aanleren</p>
				</div>
			</NavLink>

			<NavLink to="/module/3" className="nav-listlink" activeClassName="nav-link-list--active">
				<img className="nav-list-link-icon"/>
				<div className="nav-list-link-text">
					<span className="nav-list-link-text-span">Wegwijzer 3</span>
					<p className="nav-list-link-text-title">Aanleren</p>
				</div>
			</NavLink>
		</nav>

	</div>
  );

};

export default Navigation;