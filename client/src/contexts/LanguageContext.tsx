import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, type Translations } from '../utils/translations';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageContextType {
  currentLanguage: string;
  translations: Translations;
  changeLanguage: (languageCode: string) => void;
  getCurrentLanguageInfo: () => Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('tr'); // Default to Turkish
  const [translations, setTranslations] = useState<Translations>(getTranslation('tr'));

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['tr', 'en', 'de'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      setTranslations(getTranslation(savedLanguage));
    }
  }, []);

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setTranslations(getTranslation(languageCode));
    localStorage.setItem('preferred-language', languageCode);
  };

  const getCurrentLanguageInfo = (): Language => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    translations,
    changeLanguage,
    getCurrentLanguageInfo,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
