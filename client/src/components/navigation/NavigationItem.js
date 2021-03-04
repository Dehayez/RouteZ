import React, { useState, useEffect, useCallback } from 'react';
import ReactHtmlParser from 'react-html-parser';

// Import components
import { NavLink } from 'react-router-dom';

import './Navigation.scss' 

const NavigationItem = ({ index, title, alt, endpoint, logo }) => {
	const [ logoResult, setLogoResult ] = useState();

	const fetchSvg = useCallback(async () => {
		await fetch(logo, {
			method: "GET",
		}).then(async (res) => setLogoResult(await res.text()));
	}, [logo]);

	useEffect(() => {
		fetchSvg();
	}, [fetchSvg]);

	setTimeout(() => {
		const shape = document.getElementsByTagName("svg")[0];
		if (shape) shape.setAttribute("viewBox", "0 0 150 120"); 
	}, 200);

	return logoResult ? (
		<NavLink className="nav-list-link" activeClassName="nav-list-link--active" to={endpoint}>
			<div className="nav-list-link__icon-wrapper">
				<div className="nav-list-link__icon">
					{
						ReactHtmlParser(logoResult)
					}
				</div>
			</div>
			
			<div className="nav-list-link__text">
				<span className="nav-list-link__text-span">Wegwijzer {index}</span>
				<p className="nav-list-link__text-title">{title}</p>
			</div>
		</NavLink>
	) : '';

};

export default NavigationItem;