import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';

// Parse HTML
import { default as HTMLParser } from 'react-html-parser';

// Formatting date
import { default as moment } from 'moment';
import 'moment/locale/nl-be';

// Import services
import { useApi, useAuth } from '../services';

// Import routes
import * as Routes from '../routes';
import { CardMaterials } from '../partials';

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
    <>
    {
      material && (
        <>
        {/** Material */}
          <h1>{material.title}</h1>
          <>
            {
              liked ? (
                <button onClick={dislikeMaterial}>Dislike {likedDigit}</button>
              ) : (
                <button onClick={likeMaterial}>Like {likedDigit}</button>
              )
            }
          </>
          {
            HTMLParser(material.description)
          }
          <>
          {/** Author */}
            <h2>Auteur</h2>
            {console.log(material.author)}
            <div>
              <p><strong>{material.filename}</strong></p>
              <p>{date.format('L')} | {material.size}</p>
              {/** Later on adding pages */}
              <button onClick={() => getDoc(material.file)}>Download</button>
              <div>
                {
                  liked ? (
                    <button onClick={dislikeMaterial}>Dislike {likedDigit}</button>
                  ) : (
                    <button onClick={likeMaterial}>Like {likedDigit}</button>
                  )
                }
                <p>
                  <strong>{likedDigit} gedeelde hartjes</strong><br/>
                  {
                    likedDigit === 0 ? 'Er zijn nog geen hartjes uitgedeeld' : 'Dit materiaal wordt geappreciëerd'
                  }
                </p>
              </div>
            </div>
          </>
          <>
            {/** Extra materials */}
            {
              extraMaterials && (
                <>
                  <div>
                      <NavLink to={{pathname: Routes.MATERIALS, props: {
                          module: material._moduleId,
                      }}}>Bekijk meer</NavLink>
                  </div>
                  <CardMaterials
                      materials={extraMaterials}
                      user={currentUser.id}
                      token={currentUser.token}
                  />
              </>
              )
            }
          </>
        </>
      )
    }
    </>
  );
};

export default Material;
