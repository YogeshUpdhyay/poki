import React, { createContext, useContext, useState } from 'react';

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <PreloaderContext.Provider value={{ isRevealed, setIsRevealed }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
