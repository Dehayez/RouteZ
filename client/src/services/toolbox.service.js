import React, { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const ToolboxContext = createContext();
const useToolbox = () => useContext(ToolboxContext);

const ToolboxProvider = ({children}) => {
  return (
    <ToolboxContext.Provider value={{
    }}>
      {children}
    </ToolboxContext.Provider>
  )
};

export {
  ToolboxContext,
  useToolbox,
  ToolboxProvider,
};
