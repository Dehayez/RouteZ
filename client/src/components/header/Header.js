import { default as React } from 'react';

// Import icons
import { IoMdNotificationsOutline } from 'react-icons/io';

import { DefaultImage } from '../../assets/images';

import './Header.scss' 

const Header = ({pageTitle}) => {
  return (
    <header className="header">
		<div className="header-left">
			<h1 className="header-left-title">{pageTitle}</h1>
		</div>

		<div className="header-right">
			<input className="header-right-input" type="text" placeholder="Zoek"/>
			<IoMdNotificationsOutline className="header-right-icon"/>
			<div className="header-right-profile">
				<div className="header-right-profile__text">
					<p className="header-right-profile__text-name">Annelies Dedecker</p>
					<p className="header-right-profile__text-settings">Instellingen</p>
				</div>
				<img className="header-right-profile__image" src={ DefaultImage } alt="profile"/>
			</div>
		</div>
    </header>
  );
};

export default Header;