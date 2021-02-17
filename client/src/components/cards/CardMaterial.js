import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import services
import { useApi } from '../../services';

// Import routes 
import * as Routes from '../../routes';

// Import config
import { apiConfig } from '../../config';

// Images
import { DefaultImage } from '../../assets/images';

// Icons
import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5'
import { HiOutlineDownload } from 'react-icons/hi';

import './Cards.scss';

const CardMaterial = ({material, user, token}) => {
  const history = useHistory();

  // Services
  const { addLikeToMaterial, addDislikeToMaterial, getDoc } = useApi();

  // States
  const [ liked, setLiked ] = useState(material && material._likeIds.includes(user));

  // Like the material
  const likeMaterial = async () => {
    setLiked(!liked);

    await addLikeToMaterial(token, user, material._id);
  };

  // Dislike the material
  const dislikeMaterial = async () => {
    setLiked(!liked);

    await addDislikeToMaterial(token, user, material._id);
  };

  // Download material
  const readMaterial = () => {
    getDoc(material.file);
  };

  console.log(material);

  return (
	  <div className="material-card">

		<Link className="material-card-link" to={`${Routes.MATERIAL.replace(':name', material.id)}`}>

				<div className="material-card-profile">
					{
						material.author.profile.avatar ? (
							<img className="material-card-profile__image" src={`${apiConfig.baseURL}file/${ material.author.profile.avatar}`} alt="profile"/>
						) : <img className="material-detail-right-profile__image" src={ DefaultImage } alt="profile"/>
					}
					<div className="material-card-profile__text">
						<p className="material-card-profile__text-name">{material.author.profile.firstName + ' ' + material.author.profile.lastName}</p>
						<p className="material-card-profile__text-settings">{material.author.profile.schoolName}</p>
					</div>
				</div>

				<p className="material-card-text">
					"Prachtig documentje over het zelfgestuurd leren binnen onze school"
				</p>

				<div className="material-card-image" onClick={readMaterial}>
					{
						liked ? <div className="material-card-icon-heart-wrapper"> 
									<IoHeartSharp className="material-card-icon-heart material-card-icon-heart--fill" onClick={dislikeMaterial} title="Dislike"/>
								</div> 
							: 	<div className="material-card-icon-heart-wrapper">
									<IoHeartOutline className="material-card-icon-heart" onClick={likeMaterial} title="Like"/>
								</div> 
					}

					<HiOutlineDownload className="material-card-image__download"/>
				</div>
		</Link>  
	</div>
  );
};

export default CardMaterial;
