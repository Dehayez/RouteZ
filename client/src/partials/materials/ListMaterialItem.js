import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// Formatting date
import { default as moment } from 'moment';
import 'moment/locale/nl-be';

// Routes
import * as Routes from '../../routes';

// Services
import { useApi, useAuth } from '../../services';

const ListMaterialItem = ({material}) => {
  // Init date
  let date = moment(material._createdAt);
  moment.locale('nl-be');

  // Services
  const { addLikeToMaterial, addDislikeToMaterial, getDoc } = useApi();
  const { getMyself, currentUser } = useAuth();

  // States
  const [ liked, setLiked ] = useState();
  const [ likedDigit, setLikedDigit ] = useState();

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
    <>
      <h3><NavLink to={Routes.MATERIAL.replace(':name', material._id)}>{material.title}</NavLink></h3>
      <p>Geplaatst door <NavLink to={Routes.PROFILE.replace(':id', material.author._id)}>{material.author.profile.firstName + ' ' + material.author.profile.lastName}</NavLink> op {date.format('L')}</p>
      {
        liked ? <button onClick={dislikeMaterial}>Dislike {likedDigit && likedDigit}</button> : <button onClick={likeMaterial}>Like {likedDigit && likedDigit}</button>
      }
      {
        material.type === "Video" ? <NavLink to={Routes.MATERIAL.replace(':name', material._id)}>Afspelen</NavLink> : <button onClick={() => getDoc(material.file)}>Download</button>
      }
    </>
  )
};

export default ListMaterialItem;
