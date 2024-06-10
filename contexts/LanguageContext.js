// contexts/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    };

    loadLanguage();
  }, []);

  const switchLanguage = async (lang) => {
    setLanguage(lang);
    AsyncStorage.clear();
    await AsyncStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
