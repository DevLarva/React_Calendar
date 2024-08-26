import React, { createContext, useState } from 'react';

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;



