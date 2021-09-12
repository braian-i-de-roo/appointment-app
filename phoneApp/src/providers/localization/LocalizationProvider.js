import React, {useEffect, useState} from 'react';

import LocalizationContext from './LocalizationContext';
import {TranslationsProvider, useTranslator} from '@eo-locale/react-native';
import {default as localLocales} from './locales.json';
import LocalizationService from '../../services/LocalizationService';
import {useSettings} from '../settings/SettingsContext';

const localizationService = new LocalizationService();

const Inner = props => {
  const translator = useTranslator();
  const value = {
    trl: id => translator.getMessageById(id),
    trlp: prefix => id => value.trl(prefix + id),
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
  const lang = localizationService.getLocale(props.lang);
  const [language, setLanguage] = useState(lang);
  const {addSetting} = useSettings();
  useEffect(() => {
    addSetting({
      Language: {
        name: 'language',
        type: 'select',
        description: 'The language of the app',
        default: lang,
        possibleValues: ['es', 'en'],
        setter: setLanguage,
        value: language,
      },
    });
  }, []);
  return (
    <TranslationsProvider language={language} locales={localLocales}>
      <Inner language={language} setLanguage={setLanguage}>
        {props.children}
      </Inner>
    </TranslationsProvider>
  );
};

export default LocalizationProvider;
