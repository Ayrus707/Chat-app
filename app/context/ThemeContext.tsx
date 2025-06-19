
'use client'

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  themeColor: string;
  setThemeColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeColor, setThemeColor] = useState('Blue');

  useEffect(() => {
    const stored = localStorage.getItem('themeColor');
    if (stored) setThemeColor(stored);
  }, []);

  const updateThemeColor = (color: string) => {
    setThemeColor(color);
    localStorage.setItem('themeColor', color);
    console.log("Updated theme color to:", color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: updateThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColor = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeColor must be used within ThemeProvider");
  return context;
};
