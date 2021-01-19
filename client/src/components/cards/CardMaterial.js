import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// Import services
import { useApi } from '../../services';

// Import routes 
import * as Routes from '../../routes';

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
