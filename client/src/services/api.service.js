import { default as React, useContext, createContext } from 'react';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

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

  /**
   * uploading a file to the server
   * @param {json} file 
   */
  const uploadFile = async (file) => {
    const url = `${BASE_URL}file`;

    const formdata = new FormData();
    formdata.append('picture', file)

    const response = await fetch(url, {
      'method': 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formdata,
    });

    return await response.json();
  };

  return (
    <ApiContext.Provider value={{
      getSignPosts,
      getSignPost,
      getModule,
      getPath,
      uploadFile,
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
