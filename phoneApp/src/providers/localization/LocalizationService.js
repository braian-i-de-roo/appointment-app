import {default as localLocales} from './locales.json';
import {NativeModules, Platform} from 'react-native';

const defaultLang = 'es';

const findClosestLocale = localeName => {
  // exact match search
  for (const localeIndex in localLocales) {
    const locale = localLocales[localeIndex];
    if (locale.language === localeName) {
      return localeName;
    }
  }
  // is there a locale with a more specific name?
  for (const localeIndex in localLocales) {
    const locale = localLocales[localeIndex];
    const locLang = locale.language;
    const prefix = locLang.substring(0, locLang.indexOf('_'));
    if (prefix === localeName) {
      return locLang;
    }
  }
  // is there a less specific locale?
  for (const localeIndex in localLocales) {
    const locale = localLocales[localeIndex];
    const locLang = locale.language;
    const prefix = localeName.substring(0, localeName.indexOf('_'));
    if (prefix === locLang) {
      return locLang;
    }
  }

  return undefined;
};

const findClosestLocaleOrDefault = localeName => {
  if (Object.keys(localLocales).length > 0) {
    // find closest to chosen locale
    const maybeLocale = findClosestLocale(localeName);
    if (maybeLocale) {
      return maybeLocale;
    } else {
      // find closest to default locale
      const maybeDefault = findClosestLocale(defaultLang);
      if (maybeDefault) {
        return maybeDefault;
      } else {
        // give up, just return whatever we find
        return localLocales[Object.keys(localLocales)[0]].language;
      }
    }
  } else {
    return undefined;
  }
};

const userLanguage = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;
};

export const getLang = props => {
  if (props.lang) {
    const propsLang = findClosestLocaleOrDefault(props.lang);
    if (propsLang) {
      return propsLang;
    }
  }
  const userLang = findClosestLocaleOrDefault(userLanguage());
  if (userLang) {
    return userLang;
  }
  throw 'No localLocales found';
};
