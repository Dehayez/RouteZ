import React, { createContext, useContext, useState } from 'react';
import * as jwt from 'jsonwebtoken';
import { apiConfig } from '../config';

// Creating context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  /**
   * @desc Check our token that's being provided by the user
   */
  const verifyUserFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('mern:authUser'))) {
      try {
        const token = JSON.parse(localStorage.getItem('mern:authUser')).token;

        if (!token) {
          throw new Error('Token is not present!');
        };

        const decoded = jwt.verify(token, 'routez');
        if (!decoded) {
          throw new Error('Couldn\'t decode the token!');
        };

        if (decoded.exp > Date.now()) {
          throw new Error('Token is expired!')
        };

        return JSON.parse(localStorage.getItem('mern:authUser'));
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  const [currentUser, setCurrentUser] = useState(verifyUserFromLocalStorage);

  /**
   * @desc getting user who's logged in
   * @param {string} token 
   */
  const getMyself = async (token) => {
    const url = `${apiConfig.baseURL}users/me`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    });

    return await response.json();
  };

  /**
   * @desc signing in as a existing user
   * @param {string} email 
   * @param {string} password 
   */
  const signIn = async (email, password) => {
    const url = `${apiConfig.baseURL}users/login`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, 
        password
      }),
      redirect: 'follow'
    });

    const user = await response.json();

    // Place token into localStorage
    if (!user.error) {
      localStorage.setItem('mern:authUser', JSON.stringify(user));
      setCurrentUser(user);
    };

    return user;
  }

  /**
   * @desc registering an user
   * @param {string} email 
   * @param {string} password 
   * @param {string} firstname 
   * @param {string} lastname 
   */
  const signUp = async (email, password, firstname, lastname) => {
    let url = `${apiConfig.baseURL}users/register`;

    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "role": "user",
        "profile": {
          "firstName": firstname,
          "lastName": lastname,
      }}),
    });

    const user = await response.json();

    if (!user.error) {
      localStorage.setItem('mern:authUser', JSON.stringify(user));
      setCurrentUser(user);
    };

    return user;
  };

  /**
   * @desc sending a request to reset pass
   * @param {string} email 
   */
  const sendReset = async (email) => {
    let url = `${apiConfig.baseURL}reset/send`;

    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
      }),
    });

    return await response.json();
  };

  /**
   * @desc submitting the request
   * @param {string} token 
   * @param {string} password 
   */
  const submitReset = async (token, password) => {
    let url = `${apiConfig.baseURL}reset/submit`;

    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": token,
        "password": password,
      }),
    });

    return await response.json();
  };

  /**
   * @desc logging out the user
   */
  const logout = async () => {
    localStorage.setItem('mern:authUser', null);
    return true;
  }

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, logout, sendReset, submitReset, getMyself }}>
      {children}
    </AuthContext.Provider>
  )
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
}