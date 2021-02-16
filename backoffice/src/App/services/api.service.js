import { default as React, useContext, createContext } from 'react';
import { default as Downloader } from 'downloadjs';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

  // SIGNPOSTS

  /**
   * @desc get all signposts
   * @param {string} token 
   */
  const getSignPosts = async (token) => {
    const url = `${BASE_URL}signposts`;

    const response = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await response.json();
  };

  /**
   * @desc get one signpost
   * @param {string} token 
   * @param {string} id
   */
  const getSignPost = async (token, id) => {
    const url = `${BASE_URL}signposts/${id}`;

    const response = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await response.json();
  };

  /**
   * @desc create one signpost
   * @param {string} token 
   * @param {json} content
   */
  const createSignPost = async (token, content) => {
    const url = `${BASE_URL}signposts`;

    const response = await fetch(url, {
      'method': 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content),
    });

    return await response.json();
  };

  /**
   * @desc edit one signpost
   * @param {string} token 
   * @param {json} content
   * @param {string} id
   */
  const editSignPost = async (token, content, id) => {
    const url = `${BASE_URL}signposts/${id}`;

    const response = await fetch(url, {
      'method': 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content),
    });

    return await response.json();
  };

  // MODULES

  /**
   * @desc get one module
   * @param {string} token 
   * @param {string} id 
   */
  const getModule = async (token, id) => {
    const url = `${BASE_URL}modules/${id}`;

    const response = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await response.json();
  };

  /**
   * @desc get all modules
   * @param {string} token 
   */
  const getModules = async (token) => {
    const url = `${BASE_URL}modules`;

    const response = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await response.json();
  };

  // PATH

  /**
   * @desc get one path
   * @param {string} token 
   * @param {string} id 
   */
  const getPath = async (token, id) => {
    const url = `${BASE_URL}paths/${id}`;

    const response = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await response.json();
  };

  // FILES

  /**
   * uploading a file to the server
   * @param {json} file 
   * @param {string} token
   */
  const uploadFile = async (file, token) => {
    const url = `${BASE_URL}file`;

    const formdata = new FormData();
    formdata.append('picture', file)

    const response = await fetch(url, {
      'method': 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formdata,
    });

    return await response.json();
  };

  /**
   * uploading a document to the server
   * @param {json} file 
   * @param {string} token
   */
  const uploadDoc = async (token, file) => {
    const url = `${BASE_URL}doc`;

    const formdata = new FormData();
    formdata.append('file', file)

    const response = await fetch(url, {
      'method': 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formdata,
    });

    return await response.json();
  };

  /**
   * get a document of the server
   * @param {string} doc 
   */
  const getDoc = async (doc) => {
    const url = `${BASE_URL}doc/${doc}`;
    Downloader(url);
  };

  // TAGS

  /**
   * get all tags
   */
  const getTags = async () => {
    const url = `${BASE_URL}tags`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await res.json();
  };

  // MATERIAL

  /**
   * get one material
   * @param {string} id 
   * @param {string} token
   */
  const getMaterial = async (id, token) => {
    const url = `${BASE_URL}material/${id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await res.json();
  };

  /**
   * get my materials
   * @param {string} id 
   */
  const getMyMaterials = async (id) => {
    const url = `${BASE_URL}material/current/${id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await res.json();
  };

  /**
   * get all materials
   */
  const getMaterials = async () => {
    const url = `${BASE_URL}material`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await res.json();
  };

  /**
   * edit one material
   * @param {string} id
   * @param {json} context
   * @param {string} token
   */
  const editMaterial = async (token, id, context) => {
    const url = `${BASE_URL}edit-material/${id}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context),
    });

    return await res.json();
  };

    /**
   * create one material
   * @param {json} context
   * @param {string} token
   */
  const createMaterial = async (token, context) => {
    const url = `${BASE_URL}material`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context),
    });

    return await res.json();
  };

  /**
   * delete one material
   * @param {string} id
   * @param {token} string
   */
  const deleteMaterial = async (token, id) => {
    const url = `${BASE_URL}material/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await res.json();
  };

  /**
   * search all materials
   * @param {string} keywords
   * @param {array} type
   * @param {array} modules
   */
  const queryMaterials = async (keywords, type, modules) => {
    const url = `${BASE_URL}material/search`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keywords: keywords,
        type: type,
        modules: modules,
      }),
    });

    return await res.json();
  };

  /**
   * adding a like to a material
   * @param {string} token 
   * @param {string} userId 
   * @param {string} materialId 
   */
  const addLikeToMaterial = async (token, userId, materialId) => {
    const url = `${BASE_URL}material/like`;

    await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId, materialId,
      }),
    }).then(async (res) => {
      return await res.json();
    }).catch((e) => {
      return e;
    });
  };

  /**
   * adding a dislike to a material
   * @param {string} token 
   * @param {string} userId 
   * @param {string} materialId 
   */
  const addDislikeToMaterial = async (token, userId, materialId) => {
    const url = `${BASE_URL}material/dislike`;

    await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId, materialId,
      }),
    }).then(async (res) => {
      return await res.json();
    }).catch((e) => {
      return e;
    });
  };

  /**
   * main search engine
   * @param {string} token
   * @param {string} keywords 
   */
  const searchEverything = async (token, keywords) => {
    const url = `${BASE_URL}search-engine`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keywords: keywords,
      }),
    });

    return await res.json();
  };

  // USERS

  /**
   * fetch all users
   * @param {string} token 
   */
  const getUsers = async (token) => {
    const url = `${BASE_URL}users`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await res.json();
  };

  /**
   * get a user
   * @param {string} token 
   * @param {string} id
   */
  const getUser = async (token, id) => {
    const url = `${BASE_URL}users/${id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await res.json();
  };

  /**
   * delete a user
   * @param {string} token 
   * @param {string} id
   */
  const deleteUser = async (token, id) => {
    const url = `${BASE_URL}users/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await res.json();
  };

  /**
   * edit a user
   * @param {string} token 
   * @param {string} id
   * @param {json} body
   */
  const editUser = async (token, id, body) => {
    const url = `${BASE_URL}users/${id}`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  };

  /**
   * create a user
   * @param {string} token 
   * @param {json} body
   */
  const createUser = async (token, body) => {
    const url = `${BASE_URL}users/create`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  };

  return (
    <ApiContext.Provider value={{
      getSignPosts,
      getSignPost,
      createSignPost,
      editSignPost,
      getModule,
      getModules,
      getPath,
      getTags,
      uploadFile,
      uploadDoc,
      getDoc,
      getMaterial,
      getMaterials,
      createMaterial,
      editMaterial,
      getMyMaterials,
      queryMaterials,
      addLikeToMaterial,
      addDislikeToMaterial,
      deleteMaterial,
      searchEverything,
      getUsers,
      getUser,
      deleteUser,
      createUser,
      editUser,
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
};
