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
    if (JSON.parse(localStorage.getItem('mern:adminUser'))) {
      try {
        const token = JSON.parse(localStorage.getItem('mern:adminUser')).token;

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

        return JSON.parse(localStorage.getItem('mern:adminUser'));
      } catch (error) {
        return null;
      };
    };
    return null;
  };

  const [currentUser, setCurrentUser] = useState(verifyUserFromLocalStorage);

  /**
   * @desc signing in as a existing user
   * @param {string} email 
   * @param {string} password 
   */
  const signInAdmin = async (email, password) => {
    const url = `${apiConfig.baseURL}users/admin`;

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
      localStorage.setItem('mern:adminUser', JSON.stringify(user));
      setCurrentUser(user);
    };

    return user;
  };

    /**
   * @desc get current user
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

    const user = await response.json();

    return user;
  };

  /**
   * @desc logging out the user
   */
  const logoutAdmin = async () => {
    localStorage.setItem('mern:adminUser', null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
        currentUser, 
        signInAdmin, 
        getMyself,
        logoutAdmin, 
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
};
