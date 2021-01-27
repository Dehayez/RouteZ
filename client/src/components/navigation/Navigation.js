import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import components
import { NavigationItem } from './'
import { Link } from 'react-router-dom';
import { LogoColor, LogoColorSingle } from '../../assets/logos';

import './Navigation.scss' 

const Navigation = () => {

	/*
	* Store all posts with useState
	*/
	/* const [posts, getPosts] = useState([]);

	const getAllPosts = () => {
		axios.get('localhost:8000/api/file')
		.then(res => {
			// getPosts(res.data);

			console.log(res.data)
		})
	};

	useEffect(() => {
		getAllPosts();
	}, []); */

	return (
			<div className="nav">
				<Link className="nav-header" to="/dashboard">
					<img className="nav-header__image" src={LogoColor}/>
				</Link>

				<nav className="nav-list">
					<NavigationItem title="Aanleren" index="1" endpoint="/my-profile" logo={LogoColorSingle} />
					<NavigationItem title="Samen leren" index="2" endpoint="/module/2" logo={LogoColorSingle} />
					<NavigationItem title="Samen leren" index="3" endpoint="/module/2" logo={LogoColorSingle} />
					<NavigationItem title="Samen leren" index="4" endpoint="/module/2" logo={LogoColorSingle} />
					<NavigationItem title="Samen leren" index="5" endpoint="/module/2" logo={LogoColorSingle} />
					<NavigationItem title="Samen leren" index="6" endpoint="/module/2" logo={LogoColorSingle} />
					<NavigationItem title="Bruggen bouwen" index="7" endpoint="/module/2" logo={LogoColorSingle} />
				</nav>

			</div>
	);

};

export default Navigation;