// create context

import React, { createContext, useState } from "react";

export const UserContext = createContext({
  user: {},
  setUser: ({}) => {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
