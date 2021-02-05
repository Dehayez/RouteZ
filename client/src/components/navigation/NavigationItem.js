import React, { useState, useEffect } from 'react';

// Import components
import { NavLink } from 'react-router-dom';

import './Navigation.scss' 

const NavigationItem = ({ index, title, alt, endpoint, logo }) => {

	return (
		<NavLink to={endpoint} className="nav-list-link" activeClassName="nav-list-link--active">
			<div className="nav-list-link__icon-wrapper">
				<img className="nav-list-link__icon" src={logo} alt={alt}/>
			</div>
			<div className="nav-list-link__text">
				<span className="nav-list-link__text-span">Wegwijzer {index}</span>
				<p className="nav-list-link__text-title">{title}</p>
			</div>
		</NavLink>
	);

};

export default NavigationItem;