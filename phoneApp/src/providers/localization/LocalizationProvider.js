import React, {useEffect, useState} from 'react';

import LocalizationContext from './LocalizationContext';
import {TranslationsProvider, useTranslator} from '@eo-locale/react-native';
import {default as localLocales} from './locales.json';
import {getLang} from './LocalizationService';
import {useSettings} from '../settings/SettingsContext';

const Inner = props => {
  const translator = useTranslator();
  const value = {
    trl: id => translator.getMessageById(id),
    changeLanguage: props.setLanguage,
    currentLanguage: props.language,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {props.children}
    </LocalizationContext.Provider>
  );
};

const LocalizationProvider = props => {
  const lang = getLang(props);
  const [language, setLanguage] = useState(lang);
  const {addSetting} = useSettings();
  useEffect(() => {
    addSetting({
      Language: {
        name: 'Language',
        type: 'select',
        description: 'The language of the app',
        default: lang,
        possibleValues: ['es', 'en'],
        setter: setLanguage,
        value: language,
      },
    });
  }, [language]);
  return (
    <TranslationsProvider language={language} locales={localLocales}>
      <Inner language={language} setLanguage={setLanguage}>
        {props.children}
      </Inner>
    </TranslationsProvider>
  );
};

export default LocalizationProvider;
