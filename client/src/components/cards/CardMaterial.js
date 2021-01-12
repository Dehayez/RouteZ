import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// Import services
import { useApi } from '../../services';

// Import routes 
import * as Routes from '../../routes';

const CardMaterial = ({material, user, token}) => {
  const history = useHistory();

  const { addLikeToMaterial, addDislikeToMaterial } = useApi();

  const [ liked, setLiked ] = useState(material && material._likeIds.includes(user));

  const likeMaterial = async () => {
    setLiked(!liked);

    await addLikeToMaterial(token, user, material._id);
  };

  const dislikeMaterial = async () => {
    setLiked(!liked);

    await addDislikeToMaterial(token, user, material._id);
  };

  const readMaterial = () => {

  };

  return (
    <>
    {/** Liked or naaaaah */}
    {
      liked ? (
        <button onClick={dislikeMaterial}>
          Unlike
        </button>
      ) : (
        <button onClick={likeMaterial}>
          Like
        </button>
      )
    }
    <NavLink to={`${Routes.MATERIAL.replace(':name', material.id)}`}>
      Als je hierop klikt, dan zie je meer...
    </NavLink>
    {/** Download material */}
    <span onClick={readMaterial}>Download</span>
    </>    
  );
};

export default CardMaterial;
