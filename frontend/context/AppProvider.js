import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
  }, [loggedIn])
  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;