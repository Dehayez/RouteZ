import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';

// Parse HTML
import { default as HTMLParser } from 'react-html-parser';

// Formatting date
import { default as moment } from 'moment';
import 'moment/locale/nl-be';

// Import services
import { useApi, useAuth } from '../services';

// Import config
import { apiConfig } from '../config';

// Import routes
import * as Routes from '../routes';
import { CardMaterials } from '../partials';

// Components
import { ButtonSmall } from '../components'

// Icons 
import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5'
import { HiOutlineDownload } from 'react-icons/hi';

// Bootstrap
import { Row, Col } from 'react-bootstrap'

// Images
import { DefaultImage } from '../assets/images';

const Material = () => {
  const history = useHistory();

  // Get name
  const { name } = useParams();

  // Services
  const { getMaterial, addLikeToMaterial, addDislikeToMaterial, getDoc, queryMaterials } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ material, setMaterial ] = useState();
  const [ extraMaterials, setExtraMaterials ] = useState();

  const [ liked, setLiked ] = useState();
  const [ likedDigit, setLikedDigit ] = useState();

  const [ avatar, setAvatar ] = useState();

  // Init date
  let date = moment(material && material._createdAt);
  moment.locale('nl-be');

  // Get material
  const fetchMaterial = useCallback(async () => {
    try {
      const materialData = await getMaterial(name);
      setMaterial(materialData);

      if (materialData._likeIds.includes(currentUser.id)) {
        setLiked(true);
      };

      const queryMaterial = await queryMaterials(false, false, [materialData._moduleId]);

      if (!queryMaterial.error) {
        let array = [];

        queryMaterial.forEach(element => {
          array.push(element.material);
        });

        setExtraMaterials(array);
      };

      setLikedDigit(materialData._likeIds.length);
    } catch (e) {
      history.push(Routes.NOT_FOUND);
    };
  }, [getMaterial, queryMaterials, name, history, currentUser]);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  // Add like
  const likeMaterial = async () => {
    await addLikeToMaterial(currentUser.token, currentUser.id, material._id);
    setLiked(true);
    setLikedDigit(likedDigit+1);
  };

  // Remove like
  const dislikeMaterial = async () => {
    await addDislikeToMaterial(currentUser.token, currentUser.id, material._id);
    setLiked(false);
    setLikedDigit(likedDigit-1);
  };

  return (
    <div className="material">
		{
		material && (
			<>
				<Row className="material-detail">
					{/** Material */}
						<Col lg={7} className="material-detail-left">
							<div className="material-detail-title-wrapper">
								<h1 className="material-detail-title">{material.title}</h1>
								<>
									{
										liked ? <div className="material-icon-heart-wrapper"> <IoHeartSharp className="material-icon-heart material-icon-heart--big material-icon-heart--fill" onClick={dislikeMaterial} title="Dislike"/></div> 
										: <div className="material-icon-heart-wrapper"> <IoHeartOutline className="material-icon-heart material-icon-heart--big" onClick={likeMaterial} title="Like"/></div>
									}
								</>
							</div>
							<p className="material-detail-text">
								{
									HTMLParser(material.description)
								}
							</p>
						</Col>

						<Col lg={5} className="material-detail-right">
							{/** Author */}
							<h5 className="material-detail-right-title">Auteur van het materiaal</h5>
							<div className="material-detail-right-profile" >
								{
									material.author.profile.avatar ? (
										<img className="material-detail-right-profile__image" src={`${apiConfig.baseURL}file/${ material.author.profile.avatar}`} alt="profile"/>
									) : <img className="header-right-profile__image" src={ DefaultImage } alt="profile"/>
								}
								<div className="material-detail-right-profile__text">
									<p className="material-detail-right-profile__text-name">{material.author.profile.firstName + ' ' + material.author.profile.lastName}</p>
									<p className="material-detail-right-profile__text-settings">{material.author.profile.schoolName}</p>
								</div>
							</div>

							<div className="material-detail-right-download" title="Download PDF" onClick={() => getDoc(material.file)}>
								<div className="material-detail-right-download-text">
									<p className="material-detail-right-download-text__title">Download</p>
									<p className="material-detail-right-download-text__name">{material.filename}</p>
									<p className="material-detail-right-download-text__data">{date.format('L')} | {material.size} | TODO pagina's</p>
								</div>
								{/** Later on adding pages */}
								<HiOutlineDownload className="material-icon__download" /> 
							</div>
							<div className="material-detail-right-likes">
								{
									liked ? <div className="material-icon-heart-wrapper"> <IoHeartSharp className="material-icon-heart material-icon-heart--fill" onClick={dislikeMaterial} title="Dislike"/></div> 
									: <div className="material-icon-heart-wrapper"> <IoHeartOutline className="material-icon-heart" onClick={likeMaterial} title="Like"/></div>
								}
								<p className="material-detail-right-likes__text">
									<strong>{likedDigit} { likedDigit === 1 ? ' gedeeld hartje' : ' gedeelde hartjes' }</strong><br/>
									{ likedDigit === 0 ? 'Er zijn nog geen hartjes uitgedeeld' : 'Dit materiaal wordt geappreciëerd' }
								</p>
							</div>
						</Col>
				</Row>
					
				<div className="material-recommended">
					{/** Extra materials */}
					{
						extraMaterials && (
						<>
							<div className="material-recommended-header">
								<p>Dit lijkt interessant voor jou</p>
								<NavLink to={{pathname: Routes.MATERIALS, props: { module: material._moduleId,}}}>
									<ButtonSmall content="Bekijk meer" color="secondary"/>
								</NavLink>
							</div>
							<CardMaterials
								materials={extraMaterials}
								user={currentUser.id}
								token={currentUser.token}
							/>
						</>
						)
					}
				</div>
			</>
		)
		}
    </div>
  );
};

export default Material;
