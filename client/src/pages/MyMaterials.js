import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import services
import { useApi, useAuth } from '../services';

// Import routes
import * as Routes from '../routes';
import { ListMaterials } from '../partials';

const MyMaterials = () => {
  const history = useHistory();

  // Services
  const { getMyMaterials } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ textFiles, setTextFiles ] = useState();
  const [ presentations, setPresentations ] = useState();
  const [ videos, setVideos ] = useState();

  // Simple fetch of all data
  const getData = useCallback(async () => {
    try {
      const materialData = await getMyMaterials(currentUser.id);

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
  }, [getMyMaterials, currentUser, history]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="material">
    {
      videos && presentations && textFiles && (
        <div className="material-content">
          <ListMaterials owner={true} title="Alle tekstbestanden" materials={textFiles && textFiles} />
          <ListMaterials owner={true} title="Alle presentaties" materials={presentations && presentations} />
          <ListMaterials owner={true} title="Alle video's" materials={videos && videos} />
        </div>
      )
    }
    </div>
  );
};

export default MyMaterials;
