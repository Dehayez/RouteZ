import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import components
import { NavLink } from 'react-router-dom';
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

			<div className="nav-header">
				<img className="nav-header__image" src={LogoColor}/>
			</div>

			<nav className="nav-list">
				<NavLink to="/my-profile" className="nav-list-link" activeClassName="nav-list-link--active">
					<div className="nav-list-link__icon-wrapper">
						<img className="nav-list-link__icon" src={LogoColorSingle}/>
					</div>
					<div className="nav-list-link__text">
						<span className="nav-list-link__text-span">Wegwijzer 1</span>
						<p className="nav-list-link__text-title">Aanleren</p>
					</div>
				</NavLink>

				<NavLink to="/module/2" className="nav-list-link" activeClassName="nav-link-list--active">
					<div className="nav-list-link__icon-wrapper">
						<img className="nav-list-link__icon" src={LogoColorSingle}/>
					</div>				
					<div className="nav-list-link__text">
						<span className="nav-list-link__text-span">Wegwijzer 2</span>
						<p className="nav-list-link__text-title">Groeproces</p>
					</div>
				</NavLink>

				<NavLink to="/module/2" className="nav-list-link" activeClassName="nav-link-list--active">
					<div className="nav-list-link__icon-wrapper">
						<img className="nav-list-link__icon" src={LogoColorSingle}/>
					</div>				
					<div className="nav-list-link__text">
						<span className="nav-list-link__text-span">Wegwijzer 2</span>
						<p className="nav-list-link__text-title">Groeproces</p>
					</div>
				</NavLink>

				<NavLink to="/module/2" className="nav-list-link" activeClassName="nav-link-list--active">
					<div className="nav-list-link__icon-wrapper">
						<img className="nav-list-link__icon" src={LogoColorSingle}/>
					</div>				
					<div className="nav-list-link__text">
						<span className="nav-list-link__text-span">Wegwijzer 2</span>
						<p className="nav-list-link__text-title">Groeproces</p>
					</div>
				</NavLink>

				<NavLink to="/module/2" className="nav-list-link" activeClassName="nav-link-list--active">
					<div className="nav-list-link__icon-wrapper">
						<img className="nav-list-link__icon" src={LogoColorSingle}/>
					</div>				
					<div className="nav-list-link__text">
						<span className="nav-list-link__text-span">Wegwijzer 2</span>
						<p className="nav-list-link__text-title">Groeproces</p>
					</div>
				</NavLink>

				<NavLink to="/module/2" className="nav-list-link" activeClassName="nav-link-list--active">
					<div className="nav-list-link__icon-wrapper">
						<img className="nav-list-link__icon" src={LogoColorSingle}/>
					</div>				
					<div className="nav-list-link__text">
						<span className="nav-list-link__text-span">Wegwijzer 2</span>
						<p className="nav-list-link__text-title">Groeproces</p>
					</div>
				</NavLink>

				<NavLink to="/module/3" className="nav-list-link" activeClassName="nav-link-list--active">
					<div className="nav-list-link__icon-wrapper">
						<img className="nav-list-link__icon" src={LogoColorSingle}/>
					</div>				
					<div className="nav-list-link__text">
						<span className="nav-list-link__text-span">Wegwijzer 7</span>
						<p className="nav-list-link__text-title">Bruggen bouwen</p>
					</div>
				</NavLink>
			</nav>

		</div>
	);

};

export default Navigation;