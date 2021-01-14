import React, { useState } from 'react';

// Import components
import { ListMaterialItem } from '.';

const ListMaterials = ({title, materials}) => {
  // Pagination
  const [ paginateIndex, setPaginateIndex ] = useState(2);

  return (
    <>
    <h1>{title}</h1>
    {
      materials && materials.length !== 0 ? (
        <>
          {
            materials && materials.map((material, index) => {
              return index > paginateIndex ? '' : <ListMaterialItem key={index} material={material} />
            })
          }
          {
            paginateIndex === materials.length ? '' : paginateIndex > materials.length ? '' : <span onClick={() => setPaginateIndex(paginateIndex+3)}>Bekijk meer</span>
          }
        </>
      ) : <span>Er zijn geen bestanden gevonden.</span>
    }
    </>
  )
};

export default ListMaterials;
