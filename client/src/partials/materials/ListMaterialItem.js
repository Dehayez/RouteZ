import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// Formatting date
import { default as moment } from 'moment';
import 'moment/locale/nl-be';

// Routes
import * as Routes from '../../routes';

// Services
import { useApi, useAuth } from '../../services';

const ListMaterialItem = ({material, owner}) => {
  const history = useHistory();

  // Init date
  let date = moment(material._createdAt);
  moment.locale('nl-be');

  // Services
  const { addLikeToMaterial, addDislikeToMaterial, deleteMaterial, getDoc } = useApi();
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
    <>
      <h3><NavLink to={Routes.MATERIAL.replace(':name', material._id)}>{material.title}</NavLink></h3>
      {
        owner ? (
          <p>Geplaatst op {date.format('L')}</p>
        ) : (
          <p>Geplaatst door <NavLink to={Routes.PROFILE.replace(':id', material.author._id)}>{material.author.profile.firstName + ' ' + material.author.profile.lastName}</NavLink> op {date.format('L')}</p>
        )
      }
      {
        liked ? <button onClick={dislikeMaterial}>Dislike {likedDigit && likedDigit}</button> : <button onClick={likeMaterial}>Like {likedDigit && likedDigit}</button>
      }
      {
        owner ? (
          <>
            <button onClick={() => history.push(Routes.EDIT_MATERIAL, {id: material._id})}>Edit</button>
            {
              deleteState ? (
                <button onClick={removeMaterial}>Ben je zeker?</button>
              ) : (
                <button onClick={() => setDeleteState(!deleteState)}>Delete</button>
              )
            }
          </>
        ) : material.type === "Video" ? <NavLink to={Routes.MATERIAL.replace(':name', material._id)}>Afspelen</NavLink> : <button onClick={() => getDoc(material.file)}>Download</button>
      }
    </>
  )
};

export default ListMaterialItem;
