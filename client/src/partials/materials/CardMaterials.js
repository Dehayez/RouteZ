import React, { useState } from 'react';

// Import components
import { CardMaterial } from '../../components';

const CardMaterials = ({materials, user, token}) => {
  const [ pagination, setPagination ] = useState(2);

  return (
    <>
      {
        materials ? materials.map((material, index) => {
          return index <= pagination && (
            <CardMaterial key={index} user={user} token={token} material={material} />
          )
        }) : 'Er zijn nog geen bestanden upgeload'
      }
    </>
  );
};

export default CardMaterials;
