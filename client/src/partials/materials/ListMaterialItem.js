import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// Formatting date
import { default as moment } from 'moment';
import 'moment/locale/nl-be';

// Routes
import * as Routes from '../../routes';

// Icons
import { HiOutlineDownload } from 'react-icons/hi';
import { IoHeartSharp, IoHeartOutline, IoTrash } from 'react-icons/io5'
import { MdEdit, MdDelete } from 'react-icons/md';

// Services
import { useApi, useAuth } from '../../services';

import './Materials.scss';

const ListMaterialItem = ({material, owner}) => {
  const history = useHistory();

  // Init date
  let date = moment(material._createdAt);
  moment.locale('nl-be');

  // Services
  const { addLikeToMaterial, addDislikeToMaterial, deleteMaterial, getDoc, createNotification } = useApi();
  const { getMyself, currentUser } = useAuth();

  // States
  const [ liked, setLiked ] = useState();
  const [ likedDigit, setLikedDigit ] = useState();

  const [ deleteState, setDeleteState ] = useState(false);

  // Check if user has liked this material
  const checkLike = useCallback(async () => {
    const myData = await getMyself(currentUser.token);
    
    if (material._likeIds.includes(myData._id)) {
      setLiked(true);
    };

    setLikedDigit(material._likeIds.length);
  }, [getMyself, currentUser, material]);

  useEffect(() => {
    checkLike();
  }, [checkLike]);

  // Add like
  const likeMaterial = async () => {
    await addLikeToMaterial(currentUser.token, currentUser.id, material._id);
    const result = await createNotification(currentUser.token, {
      text: `Iemand van jouw materiaal genaamd "${material.title}" leuk`,
      type: 'material',
      _userId: material.author._id,
      _materialId: material._id,
    });
    console.log({
      text: `Iemand van jouw materiaal genaamd "${material.title}" leuk`,
      type: 'material',
      _userId: material.author._id,
      _materialId: material._id,
    });
    console.log(result)

    setLiked(true);
    setLikedDigit(likedDigit+1);
  };

  // Remove like
  const dislikeMaterial = async () => {
    await addDislikeToMaterial(currentUser.token, currentUser.id, material._id);
    setLiked(false);
    setLikedDigit(likedDigit-1);
  };

  // Delete on material
  const removeMaterial = async () => {
    const result = deleteMaterial(currentUser.id);

    if (result) window.location.reload();
  };

  return (
    <div className="material-list-item">
		<div className="material-list-item-left">
			<h3 className="material-list-item-title"><NavLink to={Routes.MATERIAL.replace(':name', material._id)}>{material.title}</NavLink></h3>
			<div className="material-list-item-left-bottom">
				{
					owner ? (
					<p className="material-list-item-date">Geplaatst op {date.format('L')}</p>
					) : (
					<p className="material-list-item-date">Geplaatst door <NavLink to={Routes.PROFILE.replace(':id', material.author._id)}>{material.author.profile.firstName + ' ' + material.author.profile.lastName}</NavLink> op {date.format('L')}</p>
					)
				}
				{
					liked ? <div className="material-icon-heart-wrapper--number"> 
								<div className="material-icon-heart-wrapper"> 
									<IoHeartSharp className="material-icon-heart material-icon-heart--number material-icon-heart--fill" onClick={dislikeMaterial} title="Dislike"/>
								</div> 
								<p>{likedDigit && likedDigit}</p> 
							</div>
					: <div className="material-icon-heart-wrapper--number">
						<div className="material-icon-heart-wrapper">
							 <IoHeartOutline className="material-icon-heart material-icon-heart--number" onClick={likeMaterial} title="Like"/>
						</div> 
						<p>{likedDigit && likedDigit} </p>
					</div>
				}
			</div>
	  </div>
      {
        owner ? (
          <div className="material-list-item-right">
			<MdEdit className="material-icon__edit" title="Bewerk" onClick={() => history.push(Routes.EDIT_MATERIAL, {id: material._id})}/>
            {
              deleteState ? (
				  <div className="material-list-item-right-delete" onClick={() => setDeleteState(!deleteState)}>
				 	 <p className="material-list-item-right-delete__text" title="Nee">Ben je zeker dat je dit wilt verwijderen?</p>
					<IoTrash className="material-icon__delete material-icon__delete--fill" title="Verwijder" onClick={removeMaterial}/>
				</div>
              ) : (
				<IoTrash className="material-icon__delete" title="Verwijder" onClick={() => setDeleteState(!deleteState)}/>
              )
            }
          </div>
        ) : material.type === "Video" ? <NavLink to={Routes.MATERIAL.replace(':name', material._id)}>Afspelen</NavLink> 
		  : <HiOutlineDownload className="material-icon__download" title="Download PDF" onClick={() => getDoc(material.file)}/> 
      }
    </div>
  )
};

export default ListMaterialItem;
