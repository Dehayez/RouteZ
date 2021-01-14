import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import partials
import { ListMaterials } from '../partials';

// Import components
import { FilterSelect } from '../components';

// Import routes
import * as Routes from '../routes';

// Import services
import { useApi, useAuth } from '../services';

const Materials = () => {
  const history = useHistory();

  // Services
  const { getSignPosts, getMaterials } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ signposts, setSignposts ] = useState();

  const [ textFiles, setTextFiles ] = useState();
  const [ presentations, setPresentations ] = useState();
  const [ videos, setVideos ] = useState();

  // Context
  const typesContext = [{
    id: "presentatie",
    title: "Presentatie",
  }, {
    id: "document",
    title: "Document",
  }, {
    id: "video",
    title: "Video",
  }];

  // Simple fetch of all data
  const getData = useCallback(async () => {
    try {
      const signpostData = await getSignPosts(currentUser.token);
      setSignposts(signpostData);

      const materialData = await getMaterials();

      let txt = [];
      let vid = [];
      let pres = [];

      for (let i = 0; i < materialData.length; i++) {
        switch (materialData[i].type) {
          case "Document":
            txt.push(materialData[i]);
            break;
          case "Video":
            vid.push(materialData[i]);
            break;
          case "Presentatie":
            pres.push(materialData[i]);
            break;
          default:
            break;
        };
      };

      setPresentations(pres);
      setTextFiles(txt);
      setVideos(vid);
    } catch (e) {
      history.push(Routes.NOT_FOUND);
    };
  }, [getSignPosts, getMaterials, history, currentUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
    {
      signposts && (
        <>
          <form>
            {/** Keywords */}
            <input type="text" name="keywords" id="keywords" placeholder="Zoek op basis van kernwoorden" />
            {/** Select type of file */}
            <FilterSelect
              text="Welk type bestand"
              options={typesContext}
            />
            {/** Select module/signpost */}
            <FilterSelect
              text="Welke module"
              sections={true}
              options={signposts}
            />
            <button type="submit">
              Zoeken maar
            </button>
          </form>
          <>
            <ListMaterials title="Alle tekstbestanden" materials={textFiles && textFiles} />
            <ListMaterials title="Alle presentaties" materials={presentations && presentations} />
            <ListMaterials title="Alle video's" materials={videos && videos} />
          </>
        </>
      )
    }
    </>
  );
};

export default Materials;
