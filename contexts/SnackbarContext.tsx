// create context

import React, { createContext, useState } from "react";

export const SnackContext = createContext({
  snackInfo: {
    open: false,
    message: "",
    severity: "",
  },
  setSnackInfo: ({ open, message, severity }) => {},
});
export const SnackProvider = ({ children }) => {
  const [snackInfo, setSnackInfo] = useState({
    open: false,
    message: "",
    severity: "",
  });

  return (
    <SnackContext.Provider
      value={{
        snackInfo,
        setSnackInfo,
      }}
    >
      {children}
    </SnackContext.Provider>
  );
};
