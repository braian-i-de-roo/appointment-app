import { Locale } from '../types/Locale'
import { NativeModules, Platform } from 'react-native';

const _defaultLocales = require('../providers/localization/locales.json');
const _defaultLang = 'es'

const getLocales = (locales: Array<Locale> | undefined): Array<Locale> => {
  if (locales) {
    return locales;
  } else {
    return _defaultLocales;
  }
}

export default class LocalizationService {
  private readonly locales: Array<Locale>
  private readonly defaultLang: string

  constructor (
    locales: Array<Locale> | undefined = undefined,
    defaultLang: string = _defaultLang) {
    this.locales = getLocales(locales)
    this.defaultLang = defaultLang
  }

  private findClosestLocale (language: string): string | undefined {
    // exact match search
    for (const localeIndex in this.locales) {
      const locale = this.locales[localeIndex]
      if (locale.language === language) {
        return language
      }
    }
    // is there a locale with a more specific name?
    for (const localeIndex in this.locales) {
      const locale = this.locales[localeIndex]
      const locLang = locale.language
      const prefix = locLang.substring(0, locLang.indexOf('_'))
      if (prefix === language) {
        return locLang
      }
    }
    // is there a less specific locale?
    for (const localeIndex in this.locales) {
      const locale = this.locales[localeIndex]
      const locLang = locale.language
      const prefix = language.substring(0, language.indexOf('_'))
      if (prefix === locLang) {
        return locLang
      }
    }
    return undefined
  }

  private static userLanguage(): string | undefined {
    try {
      return Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier
    } catch (e) {
      console.warn('could not get the user language', e)
      return undefined;
    }
  }

  getLocale(language: string): string {
    if (this.locales.length <= 0) {
      throw 'No locales found';
    }
    if (language) {
      const maybeClosest = this.findClosestLocale(language);
      if (maybeClosest) {
        return maybeClosest;
      }
    }
    const maybeUserLang = LocalizationService.userLanguage();
    if (maybeUserLang) {
      const maybeClosestUser = this.findClosestLocale(maybeUserLang);
      if (maybeClosestUser) {
        return maybeClosestUser;
      }
    }
    if (this.defaultLang) {
      const maybeClosestDefault = this.findClosestLocale(this.defaultLang);
      if (maybeClosestDefault) {
        return maybeClosestDefault;
      }
    }
    return this.locales[0].language;
  }
}
