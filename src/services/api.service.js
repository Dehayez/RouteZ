import { default as React, useContext, createContext } from 'react';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

  // this functions finds every data of vehicle
  const findAllPosts = async (query = null) => {
    let url = `${BASE_URL}/search`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    return response.json();
  }

  const findPost = async (id) => {
    let url = `${BASE_URL}/posts/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const createPostViewModel = async (post) => {
    let url = `${BASE_URL}/posts/create`;
    const response = await fetch(url);
    return response.json();
  }

  const storePost = async (post) => {
    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts`;
    const response = await fetch(url, options);
    return response.json();
  }

  const editPostViewModel = async (postId) => {
    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/posts/${postId}/edit`;
    const response = await fetch(url, options);
    return response.json();
  }

  const updatePost = async (post) => {
    const options = {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts/${post._id}`;
    const response = await fetch(url, options);
    return response.json();
  }

  const deletePost = async (id, mode = 0) => {
    const options = {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(`${BASE_URL}/posts/${id}?mode=${mode}`, options);
    return await response.json();
  }

  const queryParams = (options) => {
    return Object.keys(options)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key])).join('&');
  }

  return (
    <ApiContext.Provider value={{ createPostViewModel, deletePost, findAllPosts, findPost, storePost, editPostViewModel, updatePost }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}