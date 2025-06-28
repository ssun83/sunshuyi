import React, { createContext, useContext, useState } from 'react';

// Create the theme context for managing leaf/paw switching
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component with beautiful state management
export const ThemeProvider = ({ children }) => {
  // State to track current theme: 'nature' (leaves/tree) or 'cat' (paws/cat)
  const [currentTheme, setCurrentTheme] = useState('nature');
  
  // Beautiful theme switching function with smooth transitions
  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'nature' ? 'cat' : 'nature');
  };

  // Theme configuration object
  const themeConfig = {
    nature: {
      background: 'img/tree.jpg',
      fallInObjects: [
        'img/leaves/leaf1.png',
        'img/leaves/leaf2.png',
        'img/leaves/leaf3.png',
        'img/leaves/leaf4.png',
        'img/leaves/leaf5.png',
        'img/leaves/leaf6.png',
        'img/leaves/leaf7.png',
        'img/leaves/leaf8.png'
      ],
      name: 'Nature Theme'
    },
    cat: {
      background: 'img/cat.jpg',
      fallInObjects: [
        'img/paws/paw1.png',
        'img/paws/paw2.png'
      ],
      name: 'Cat Theme'
    }
  };

  // Context value with all the sexy theme management functions
  const value = {
    currentTheme,
    toggleTheme,
    themeConfig,
    getCurrentConfig: () => themeConfig[currentTheme],
    isNatureTheme: currentTheme === 'nature',
    isCatTheme: currentTheme === 'cat'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 