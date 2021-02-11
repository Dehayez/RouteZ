import React, { useState } from 'react';

// Import components
import { ListMaterialItem } from '.';

import './Materials.scss';

const ListMaterials = ({title, materials, owner}) => {
  // Pagination
  const [ paginateIndex, setPaginateIndex ] = useState(2);

  return (
    <div className="material-list">
    <h1 className="material-list-title">{title}</h1>
    {
      materials && materials.length !== 0 ? (
        <>
          {
            materials && materials.map((material, index) => {
              return index > paginateIndex ? '' : owner ? <ListMaterialItem owner={owner} key={index} material={material}/> : <ListMaterialItem owner={owner} key={index} material={material} />
            })
          }
          {
            paginateIndex === materials.length ? '' : paginateIndex > materials.length ? '' : <p className="material-list-more" onClick={() => setPaginateIndex(paginateIndex+3)}>Bekijk meer</p>
          }
        </>
      ) : <span className="material-list-warning">Er zijn geen bestanden gevonden.</span>
    }
    </div>
  )
};

export default ListMaterials;
