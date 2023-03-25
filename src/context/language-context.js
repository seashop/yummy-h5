import React from 'react';

const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: (language) => {},
  messages: {}
});

export default LanguageContext
