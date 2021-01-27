import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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

  // Is it a redirect?
  const { props } = useLocation();

  // Services
  const { getSignPosts, getMaterials, queryMaterials, getTags } = useApi();
  const { currentUser } = useAuth();

  // States
  const [ signposts, setSignposts ] = useState();
  const [ tags, setTags ] = useState();

  const [ textFiles, setTextFiles ] = useState();
  const [ presentations, setPresentations ] = useState();
  const [ videos, setVideos ] = useState();

  const [ queryForm, setQueryForm ] = useState({
    "keywords": "",
    "type": [],
    "modules": [],
    "tags": [],
  });

  // Context
  const typesContext = [{
    id: "Presentatie",
    title: "Presentatie",
  }, {
    id: "Document",
    title: "Document",
  }, {
    id: "Video",
    title: "Video",
  }];

  // Simple fetch of all data
  const getData = useCallback(async () => {
    try {
      const signpostData = await getSignPosts(currentUser.token);
      const tagsData = await getTags();
      setTags(tagsData);
      setSignposts(signpostData);

      let txt = [];
      let vid = [];
      let pres = [];

      // Check if it's coming from a redirect
      if (props && props.module) {
        const materialData = await queryMaterials(false, false, [props.module]);  
        for (let i = 0; i < materialData.length; i++) {
          switch (materialData[i].material.type) {
            case "Document":
              txt.push(materialData[i].material);
              break;
            case "Video":
              vid.push(materialData[i].material);
              break;
            case "Presentatie":
              pres.push(materialData[i].material);
              break;
            default:
              break;
          };
        };
      } else {
        // Otherwise show everything
        const materialData = await getMaterials();
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
      };

      setPresentations(pres);
      setTextFiles(txt);
      setVideos(vid);
    } catch (e) {
      history.push(Routes.NOT_FOUND);
    };
  }, [getSignPosts, queryMaterials, props, getMaterials, history, getTags, currentUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  const searchMaterials = async (e) => {
    e.preventDefault();

    let txt = [];
    let vid = [];
    let pres = [];

    if (queryForm.keywords.length !== 0 || queryForm.modules.length !== 0 || queryForm.type.length !== 0) {
      const materialData = await queryMaterials(
        queryForm.keywords.length !== 0 ? queryForm.keywords : false,
        queryForm.type.length !== 0 ? queryForm.type : false,
        queryForm.modules.length !== 0 ? queryForm.modules : false,
        queryForm.tags.length !== 0 ? queryForm.tags : false,
      );

      for (let i = 0; i < materialData.length; i++) {
        switch (materialData[i].material.type) {
          case "Document":
            txt.push(materialData[i].material);
            break;
          case "Video":
            vid.push(materialData[i].material);
            break;
          case "Presentatie":
            pres.push(materialData[i].material);
            break;
          default:
            break;
        };
      };
    } else {
      const materialData = await getMaterials();
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
    };

    setPresentations(pres);
    setTextFiles(txt);
    setVideos(vid);
  };

  const changeKeywords = (value) => {
    setQueryForm({
      ...queryForm,
      keywords: value,
    });
  };

  return (
    <>
    {
      signposts && (
        <>
          <form onSubmit={(e) => searchMaterials(e)}>
            {/** Keywords */}
            <input type="text" onChange={(e) => changeKeywords(e.target.value)} name="keywords" id="keywords" placeholder="Zoek op basis van kernwoorden" />
            {/** Select type of file */}
            <FilterSelect
              text="Welk type bestand"
              options={typesContext}
              query={queryForm}
              setQuery={setQueryForm}
              type="type"
            />
            {/** Select module/signpost */}
            <FilterSelect
              text="Welke module"
              sections={true}
              options={signposts}
              query={queryForm}
              setQuery={setQueryForm}
              type="modules"
            />
            {/** Select tag */}
            <FilterSelect
              text="Welke tag"
              options={tags}
              query={queryForm}
              setQuery={setQueryForm}
              type="tags"
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
